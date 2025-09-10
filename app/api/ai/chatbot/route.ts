import { NextRequest, NextResponse } from 'next/server';
import { withSubscriptionAuth } from '@/lib/middleware';
import { validateRequestBody, aiChatbotSchema } from '@/lib/validations';
import { getLegalAdvice, logAIUsage } from '@/lib/ai-services';
import { supabaseAdmin } from '@/lib/supabase';

// Rate limiting configuration for chatbot
const RATE_LIMITS = {
  free: { requests: 10, window: 24 * 60 * 60 * 1000 }, // 10 per day
  pro: { requests: 500, window: 24 * 60 * 60 * 1000 }, // 500 per day
  enterprise: { requests: 2000, window: 24 * 60 * 60 * 1000 }, // 2000 per day
};

// POST /api/ai/chatbot - Get legal advice from AI chatbot
export const POST = withSubscriptionAuth(['active', 'trial'], async (request: NextRequest, user) => {
    try {
      const body = await request.json();
      const validatedData = validateRequestBody(aiChatbotSchema, body);

      // Check rate limits
      const rateLimit = RATE_LIMITS[user.role as keyof typeof RATE_LIMITS] || RATE_LIMITS.free;
      const rateLimitCheck = await checkRateLimit(user.id, 'CHATBOT_QUERY', rateLimit);
      
      if (!rateLimitCheck.allowed) {
        return NextResponse.json(
          { 
            error: 'Rate limit exceeded',
            message: `You have exceeded your daily limit of ${rateLimit.requests} chatbot queries. Please upgrade your plan or try again tomorrow.`,
            resetTime: rateLimitCheck.resetTime 
          },
          { status: 429 }
        );
      }

      // Get document context if documentId is provided
      let documentContext = '';
      if (validatedData.documentId) {
        const { data: document } = await supabaseAdmin
          .from('documents')
          .select('title, content, type, jurisdiction')
          .eq('id', validatedData.documentId)
          .eq('user_id', user.id)
          .single();

        if (document) {
          documentContext = `Document: ${document.title} (${document.type}, ${document.jurisdiction})\nContent: ${document.content.substring(0, 1000)}...`;
        }
      }

      // Get AI response
      const aiResponse = await getLegalAdvice(
        validatedData.message,
        validatedData.context,
        documentContext
      );

      // Log AI usage
      await logAIUsage(user.id, 'chatbot', 1000, 0.02); // Estimated tokens and cost

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'AI_CHATBOT_QUERY',
          description: 'Used AI legal assistant chatbot',
          metadata: {
            message: validatedData.message.substring(0, 100) + '...', // Truncated for privacy
            documentId: validatedData.documentId,
            hasContext: !!validatedData.context?.length,
          },
        });

      return NextResponse.json({
        success: true,
        data: {
          response: aiResponse,
          timestamp: new Date().toISOString(),
          context_used: !!documentContext,
        },
        usage: {
          remaining: rateLimit.requests - (rateLimitCheck.currentUsage + 1),
          resetTime: rateLimitCheck.resetTime,
        },
      });
    } catch (error) {
      console.error('Chatbot error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Validation error')) {
          return NextResponse.json(
            { error: 'Invalid input data', details: error.message },
            { status: 400 }
          );
        }
        
        if (error.message.includes('Failed to get legal advice')) {
          return NextResponse.json(
            { error: 'AI service temporarily unavailable', message: 'Please try again in a few moments' },
            { status: 503 }
          );
        }
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
});

// Helper function to check rate limits
async function checkRateLimit(
  userId: string, 
  action: string, 
  limit: { requests: number; window: number }
): Promise<{ allowed: boolean; currentUsage: number; resetTime: Date }> {
  try {
    const windowStart = new Date(Date.now() - limit.window);
    
    
    const { data: usageLogs, error } = await supabaseAdmin
      .from('audit_logs')
      .select('id')
      .eq('user_id', userId)
      .eq('action', `AI_${action}`)
      .gte('created_at', windowStart.toISOString());

    if (error) {
      console.error('Error checking rate limit:', error);
      return { allowed: true, currentUsage: 0, resetTime: new Date(Date.now() + limit.window) };
    }

    const currentUsage = usageLogs?.length || 0;
    const resetTime = new Date(Date.now() + limit.window);

    return {
      allowed: currentUsage < limit.requests,
      currentUsage,
      resetTime,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    return { allowed: true, currentUsage: 0, resetTime: new Date(Date.now() + limit.window) };
  }
}
