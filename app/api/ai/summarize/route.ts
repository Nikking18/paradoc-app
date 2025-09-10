import { NextRequest, NextResponse } from 'next/server';
import { withSubscriptionAuth } from '@/lib/middleware';
import { validateRequestBody, aiSummarizeSchema } from '@/lib/validations';
import { summarizeDocument, assessDocumentRisk, logAIUsage } from '@/lib/ai-services';
import { supabaseAdmin } from '@/lib/supabase';

// Rate limiting configuration for summarization
const RATE_LIMITS = {
  free: { requests: 5, window: 24 * 60 * 60 * 1000 }, // 5 per day
  pro: { requests: 50, window: 24 * 60 * 60 * 1000 }, // 50 per day
  enterprise: { requests: 200, window: 24 * 60 * 60 * 1000 }, // 200 per day
};

// POST /api/ai/summarize - Summarize document content
export const POST = withSubscriptionAuth(['active', 'trial'], async (request: NextRequest, user) => {
    try {
      const body = await request.json();
      const validatedData = validateRequestBody(aiSummarizeSchema, body);

      // Check rate limits
      const rateLimit = RATE_LIMITS[user.role as keyof typeof RATE_LIMITS] || RATE_LIMITS.free;
      const rateLimitCheck = await checkRateLimit(user.id, 'DOCUMENT_SUMMARY', rateLimit);
      
      if (!rateLimitCheck.allowed) {
        return NextResponse.json(
          { 
            error: 'Rate limit exceeded',
            message: `You have exceeded your daily limit of ${rateLimit.requests} document summaries. Please upgrade your plan or try again tomorrow.`,
            resetTime: rateLimitCheck.resetTime 
          },
          { status: 429 }
        );
      }

      // Generate summary
      const summary = await summarizeDocument(validatedData.content, validatedData.type || 'brief');

      // For pro and enterprise users, also perform risk assessment
      let riskAssessment = null;
      if (user.role === 'pro' || user.role === 'enterprise') {
        try {
          riskAssessment = await assessDocumentRisk(validatedData.content);
        } catch (error) {
          console.error('Risk assessment failed:', error);
          // Continue without risk assessment if it fails
        }
      }

      // Log AI usage
      const tokensUsed = Math.ceil(validatedData.content.length / 4); // Rough token estimate
      await logAIUsage(user.id, 'summarization', tokensUsed, tokensUsed * 0.00002); // Estimated cost

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'AI_DOCUMENT_SUMMARY',
          description: `Generated ${validatedData.type || 'brief'} summary`,
          metadata: {
            content_length: validatedData.content.length,
            summary_type: validatedData.type || 'brief',
            risk_assessment_included: !!riskAssessment,
          },
        });

      const responseData: {
        summary: string;
        summary_type: string;
        content_length: number;
        generated_at: string;
        risk_assessment?: {
          riskScore: number;
          analysis: string;
          timestamp: string;
          recommendations: string[];
        };
      } = {
        summary,
        summary_type: validatedData.type || 'brief',
        content_length: validatedData.content.length,
        generated_at: new Date().toISOString(),
      };

      if (riskAssessment) {
        responseData.risk_assessment = riskAssessment;
      }

      return NextResponse.json({
        success: true,
        data: responseData,
        usage: {
          remaining: rateLimit.requests - (rateLimitCheck.currentUsage + 1),
          resetTime: rateLimitCheck.resetTime,
        },
      });
    } catch (error) {
      console.error('Document summarization error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Validation error')) {
          return NextResponse.json(
            { error: 'Invalid input data', details: error.message },
            { status: 400 }
          );
        }
        
        if (error.message.includes('Failed to summarize')) {
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
