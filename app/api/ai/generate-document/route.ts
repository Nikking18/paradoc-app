import { NextRequest, NextResponse } from 'next/server';
import { withSubscriptionAuth } from '@/lib/middleware';
import { validateRequestBody, aiGenerateDocumentSchema } from '@/lib/validations';
import { generateLegalDocument, logAIUsage } from '@/lib/ai-services';
import { supabaseAdmin } from '@/lib/supabase';

// Rate limiting configuration
const RATE_LIMITS = {
  free: { requests: 5, window: 24 * 60 * 60 * 1000 }, // 5 per day
  pro: { requests: 100, window: 24 * 60 * 60 * 1000 }, // 100 per day
  enterprise: { requests: 1000, window: 24 * 60 * 60 * 1000 }, // 1000 per day
};

// POST /api/ai/generate-document - Generate legal document using AI
export const POST = withSubscriptionAuth(['active', 'trial'], async (request: NextRequest, user) => {
    try {
      const body = await request.json();
      const validatedData = validateRequestBody(aiGenerateDocumentSchema, body);

      // Check rate limits
      const rateLimit = RATE_LIMITS[user.role as keyof typeof RATE_LIMITS] || RATE_LIMITS.free;
      const rateLimitCheck = await checkRateLimit(user.id, 'GENERATE_DOCUMENT', rateLimit);
      
      if (!rateLimitCheck.allowed) {
        return NextResponse.json(
          { 
            error: 'Rate limit exceeded',
            message: `You have exceeded your daily limit of ${rateLimit.requests} document generations. Please upgrade your plan or try again tomorrow.`,
            resetTime: rateLimitCheck.resetTime 
          },
          { status: 429 }
        );
      }

      // Generate document using AI
      const generatedContent = await generateLegalDocument(
        validatedData.prompt,
        validatedData.type || 'other',
        validatedData.jurisdiction || 'US',
        validatedData.context
      );

      // Create document in database
      const { data: document, error } = await supabaseAdmin
        .from('documents')
        .insert({
          user_id: user.id,
          title: `AI Generated ${(validatedData.type || 'other').charAt(0).toUpperCase() + (validatedData.type || 'other').slice(1)}`,
          content: generatedContent,
          type: validatedData.type || 'other',
          jurisdiction: validatedData.jurisdiction || 'US',
          metadata: {
            generated_by_ai: true,
            original_prompt: validatedData.prompt,
            generation_context: validatedData.context,
            generated_at: new Date().toISOString(),
          },
        })
        .select('id, title, content, type, jurisdiction, metadata, created_at, updated_at')
        .single();

      if (error) {
        console.error('Error saving generated document:', error);
        return NextResponse.json(
          { error: 'Failed to save generated document' },
          { status: 500 }
        );
      }

      // Log AI usage for billing/analytics
      await logAIUsage(user.id, 'document_generation', 2000, 0.05); // Estimated tokens and cost

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'AI_DOCUMENT_GENERATED',
          description: `Generated ${validatedData.type || 'other'} document using AI`,
          metadata: {
            documentId: document.id,
            prompt: validatedData.prompt,
            type: validatedData.type || 'other',
            jurisdiction: validatedData.jurisdiction || 'US',
          },
        });

      return NextResponse.json({
        success: true,
        data: document,
        message: 'Document generated successfully',
        usage: {
          remaining: rateLimit.requests - (rateLimitCheck.currentUsage + 1),
          resetTime: rateLimitCheck.resetTime,
        },
      });
    } catch (error) {
      console.error('Document generation error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Validation error')) {
          return NextResponse.json(
            { error: 'Invalid input data', details: error.message },
            { status: 400 }
          );
        }
        
        if (error.message.includes('Failed to generate')) {
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
      // Allow request if we can't check (fail open)
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
    // Fail open - allow the request
    return { allowed: true, currentUsage: 0, resetTime: new Date(Date.now() + limit.window) };
  }
}
