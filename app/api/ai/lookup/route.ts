import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { aiLookupSchema } from '@/lib/validations';
import { lookupLegalInformation, logAIUsage } from '@/lib/ai-services';
import { supabaseAdmin } from '@/lib/supabase';

// Rate limiting configuration for lookup
const RATE_LIMITS = {
  free: { requests: 10, window: 24 * 60 * 60 * 1000 }, // 10 per day
  pro: { requests: 100, window: 24 * 60 * 60 * 1000 }, // 100 per day
  enterprise: { requests: 500, window: 24 * 60 * 60 * 1000 }, // 500 per day
};

// GET /api/ai/lookup - Search legal statutes, templates, and case law
export const GET = withAuth(async (request: NextRequest, user) => {
    try {
      const { searchParams } = new URL(request.url);
      const queryParams = Object.fromEntries(searchParams.entries());
      const validatedData = aiLookupSchema.parse(queryParams);

      // Check rate limits
      const rateLimit = RATE_LIMITS[user.role as keyof typeof RATE_LIMITS] || RATE_LIMITS.free;
      const rateLimitCheck = await checkRateLimit(user.id, 'LEGAL_LOOKUP', rateLimit);
      
      if (!rateLimitCheck.allowed) {
        return NextResponse.json(
          { 
            error: 'Rate limit exceeded',
            message: `You have exceeded your daily limit of ${rateLimit.requests} legal lookups. Please upgrade your plan or try again tomorrow.`,
            resetTime: rateLimitCheck.resetTime 
          },
          { status: 429 }
        );
      }

      // Perform legal information lookup
      const lookupResults = await lookupLegalInformation(
        validatedData.query,
        validatedData.jurisdiction,
        validatedData.category
      );

      // Log AI usage
      await logAIUsage(user.id, 'legal_lookup', 1500, 0.03); // Estimated tokens and cost

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'AI_LEGAL_LOOKUP',
          description: `Searched legal information: ${validatedData.query}`,
          metadata: {
            query: validatedData.query,
            jurisdiction: validatedData.jurisdiction,
            category: validatedData.category,
            sources_found: lookupResults.sources?.length || 0,
          },
        });

      return NextResponse.json({
        success: true,
        data: lookupResults,
        usage: {
          remaining: rateLimit.requests - (rateLimitCheck.currentUsage + 1),
          resetTime: rateLimitCheck.resetTime,
        },
      });
    } catch (error) {
      console.error('Legal lookup error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('validation error')) {
          return NextResponse.json(
            { error: 'Invalid query parameters', details: error.message },
            { status: 400 }
          );
        }
        
        if (error.message.includes('Failed to lookup')) {
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
