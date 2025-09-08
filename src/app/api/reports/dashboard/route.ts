import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, subscription_status, created_at')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user's documents
    const { data: documents, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', user.id);

    if (docError) {
      console.error('Error fetching documents:', docError);
      return NextResponse.json({ error: 'Failed to fetch documents' }, { status: 500 });
    }

    // Calculate statistics
    const totalDocuments = documents.length;
    const generatedDocuments = documents.filter(doc => doc.template_type !== 'uploaded').length;
    const uploadedDocuments = documents.filter(doc => doc.template_type === 'uploaded').length;
    const riskAssessments = documents.filter(doc => doc.metadata?.riskScore).length;

    // Calculate average risk score
    const riskScores = documents
      .filter(doc => doc.metadata?.riskScore)
      .map(doc => doc.metadata.riskScore);
    const averageRiskScore = riskScores.length > 0 
      ? Math.round(riskScores.reduce((sum, score) => sum + score, 0) / riskScores.length)
      : 0;

    // Calculate monthly usage (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyUsage = documents.filter(doc => 
      new Date(doc.created_at) >= thirtyDaysAgo
    ).length;

    // Get last activity
    const lastActivity = documents.length > 0 
      ? new Date(Math.max(...documents.map(doc => new Date(doc.updated_at).getTime())))
      : new Date(user.created_at);

    // Document type statistics
    const documentTypes = documents.reduce((acc, doc) => {
      const type = doc.template_type || 'other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const documentStats = Object.entries(documentTypes).map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count,
      percentage: Math.round((count / totalDocuments) * 100)
    }));

    const reportData = {
      totalDocuments,
      generatedDocuments,
      uploadedDocuments,
      riskAssessments,
      averageRiskScore,
      monthlyUsage,
      subscriptionStatus: user.subscription_status || 'trial',
      lastActivity: formatLastActivity(lastActivity)
    };

    return NextResponse.json({
      reportData,
      documentStats
    });

  } catch (error) {
    console.error('Reports error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function formatLastActivity(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else if (diffInHours < 48) {
    return 'Yesterday';
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }
}
