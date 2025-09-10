import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { getSubscriptionDetails } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/subscription - Get user's subscription details
export const GET = withAuth(async (request: NextRequest, user) => {
    try {
      // Get subscription details from Stripe and database
      const subscriptionDetails = await getSubscriptionDetails(user.id);

      // Get user's current plan information
      const { data: userProfile } = await supabaseAdmin
        .from('users')
        .select('role, subscription_status, trial_ends_at, stripe_customer_id')
        .eq('id', user.id)
        .single();

      if (!userProfile) {
        return NextResponse.json(
          { error: 'User profile not found' },
          { status: 404 }
        );
      }

      // Calculate trial status
      let trialStatus = null;
      if (userProfile.trial_ends_at) {
        const trialEndsAt = new Date(userProfile.trial_ends_at);
        const now = new Date();
        const daysRemaining = Math.ceil((trialEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        trialStatus = {
          isActive: now < trialEndsAt,
          endsAt: userProfile.trial_ends_at,
          daysRemaining: Math.max(0, daysRemaining),
        };
      }

      // Get usage statistics
      const usageStats = await getUserUsageStats(user.id);

      const responseData = {
        subscription: subscriptionDetails,
        user: {
          role: userProfile.role,
          subscriptionStatus: userProfile.subscription_status,
          hasStripeCustomer: !!userProfile.stripe_customer_id,
        },
        trial: trialStatus,
        usage: usageStats,
        features: getFeaturesByRole(userProfile.role),
      };

      return NextResponse.json({
        success: true,
        data: responseData,
      });
    } catch (error) {
      console.error('Subscription fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch subscription details' },
        { status: 500 }
      );
    }
});

// Helper function to get user usage statistics
async function getUserUsageStats(userId: string) {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    // Get usage counts for the last 30 days
    const { data: usageLogs } = await supabaseAdmin
      .from('audit_logs')
      .select('action, created_at')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .in('action', [
        'AI_DOCUMENT_GENERATED',
        'AI_CHATBOT_QUERY', 
        'AI_DOCUMENT_SUMMARY',
        'AI_LEGAL_LOOKUP',
        'DOCUMENT_CREATED'
      ]);

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const todayUsage = usageLogs?.filter(log => 
      new Date(log.created_at) >= startOfDay
    ) || [];

    const usage = {
      documentsGenerated: {
        total: usageLogs?.filter(log => log.action === 'AI_DOCUMENT_GENERATED').length || 0,
        today: todayUsage.filter(log => log.action === 'AI_DOCUMENT_GENERATED').length || 0,
      },
      chatbotQueries: {
        total: usageLogs?.filter(log => log.action === 'AI_CHATBOT_QUERY').length || 0,
        today: todayUsage.filter(log => log.action === 'AI_CHATBOT_QUERY').length || 0,
      },
      documentsSummarized: {
        total: usageLogs?.filter(log => log.action === 'AI_DOCUMENT_SUMMARY').length || 0,
        today: todayUsage.filter(log => log.action === 'AI_DOCUMENT_SUMMARY').length || 0,
      },
      legalLookups: {
        total: usageLogs?.filter(log => log.action === 'AI_LEGAL_LOOKUP').length || 0,
        today: todayUsage.filter(log => log.action === 'AI_LEGAL_LOOKUP').length || 0,
      },
      documentsCreated: {
        total: usageLogs?.filter(log => log.action === 'DOCUMENT_CREATED').length || 0,
        today: todayUsage.filter(log => log.action === 'DOCUMENT_CREATED').length || 0,
      },
    };

    return usage;
  } catch (error) {
    console.error('Error fetching usage stats:', error);
    return {
      documentsGenerated: { total: 0, today: 0 },
      chatbotQueries: { total: 0, today: 0 },
      documentsSummarized: { total: 0, today: 0 },
      legalLookups: { total: 0, today: 0 },
      documentsCreated: { total: 0, today: 0 },
    };
  }
}

// Helper function to get features by role
function getFeaturesByRole(role: string) {
  const baseFeatures = {
    documentGeneration: true,
    documentStorage: true,
    basicSupport: true,
  };

  const proFeatures = {
    ...baseFeatures,
    unlimitedDocuments: true,
    chatbot: true,
    aiSummarizer: true,
    riskScanner: true,
    legalLookup: true,
    exportFormats: ['PDF', 'DOCX', 'Google Docs'],
    storageMonths: 6,
    emailSupport: true,
  };

  const enterpriseFeatures = {
    ...proFeatures,
    bulkUpload: true,
    customAITuning: true,
    apiAccess: true,
    teamAccess: true,
    unlimitedStorage: true,
    prioritySupport: true,
    analytics: true,
    storageMonths: null, // Unlimited
  };

  switch (role) {
    case 'pro':
      return proFeatures;
    case 'enterprise':
      return enterpriseFeatures;
    default:
      return {
        ...baseFeatures,
        documentsPerMonth: 5,
        storageMonths: 1,
      };
  }
}
