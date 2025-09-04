import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { openrouter } from '@/lib/openrouter';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { template, title, description, jurisdiction, parties, specificRequirements, additionalNotes } = body;

    // Get user ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, subscription_status, trial_ends_at')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check subscription status
    const isTrialActive = user.subscription_status === 'trial' && 
      user.trial_ends_at && 
      new Date(user.trial_ends_at) > new Date();
    
    const isSubscribed = user.subscription_status === 'active' || isTrialActive;

    if (!isSubscribed) {
      return NextResponse.json({ error: 'Subscription required' }, { status: 403 });
    }

    // Create document record
    const { data: document, error: docError } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        title,
        template_type: template,
        jurisdiction,
        status: 'processing',
        metadata: {
          description,
          parties,
          specificRequirements,
          additionalNotes
        }
      })
      .select()
      .single();

    if (docError) {
      console.error('Error creating document:', docError);
      return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
    }

    // Generate document using AI
    const prompt = generateDocumentPrompt(template, {
      title,
      description,
      jurisdiction,
      parties,
      specificRequirements,
      additionalNotes
    });

    try {
      const completion = await openrouter.chat.completions.create({
        model: "anthropic/claude-3.5-sonnet",
        messages: [
          {
            role: "system",
            content: "You are a professional legal document generator. Create comprehensive, legally compliant documents based on the user's requirements. Ensure the document is professional, clear, and follows standard legal formatting."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.3
      });

      const generatedContent = completion.choices[0]?.message?.content || '';

      // Update document with generated content
      const { error: updateError } = await supabase
        .from('documents')
        .update({
          content: generatedContent,
          status: 'completed',
          updated_at: new Date().toISOString()
        })
        .eq('id', document.id);

      if (updateError) {
        console.error('Error updating document:', updateError);
      }

      return NextResponse.json({
        document: generatedContent,
        documentId: document.id,
        status: 'completed'
      });

    } catch (aiError) {
      console.error('AI generation error:', aiError);
      
      // Update document status to failed
      await supabase
        .from('documents')
        .update({ status: 'failed' })
        .eq('id', document.id);

      return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
    }

  } catch (error) {
    console.error('Document generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateDocumentPrompt(template: string, data: any): string {
  const basePrompt = `Generate a professional legal document with the following specifications:

Title: ${data.title}
Description: ${data.description}
Jurisdiction: ${data.jurisdiction}
Parties: ${data.parties}
Specific Requirements: ${data.specificRequirements}
Additional Notes: ${data.additionalNotes}

`;

  switch (template) {
    case 'nda':
      return basePrompt + `Create a comprehensive Non-Disclosure Agreement (NDA) that includes:
- Clear definition of confidential information
- Obligations of the receiving party
- Duration of confidentiality
- Exceptions to confidentiality
- Remedies for breach
- Governing law and jurisdiction
- Standard legal clauses (severability, entire agreement, etc.)

Make sure the document is legally compliant for ${data.jurisdiction} jurisdiction.`;

    case 'contract':
      return basePrompt + `Create a professional Service Agreement that includes:
- Clear scope of services
- Payment terms and schedule
- Timeline and deliverables
- Intellectual property rights
- Liability and indemnification
- Termination clauses
- Dispute resolution
- Governing law and jurisdiction

Make sure the document is legally compliant for ${data.jurisdiction} jurisdiction.`;

    case 'terms':
      return basePrompt + `Create comprehensive Terms of Service that includes:
- Acceptance of terms
- Description of service
- User obligations and restrictions
- Intellectual property rights
- Privacy and data protection
- Limitation of liability
- Termination
- Governing law and dispute resolution
- Contact information

Make sure the document is legally compliant for ${data.jurisdiction} jurisdiction and includes modern digital service provisions.`;

    case 'privacy':
      return basePrompt + `Create a GDPR-compliant Privacy Policy that includes:
- Information collection practices
- Use of personal data
- Data sharing and third parties
- User rights and choices
- Data security measures
- Cookies and tracking
- International data transfers
- Contact information for privacy inquiries
- Updates to policy

Make sure the document is legally compliant for ${data.jurisdiction} jurisdiction and follows GDPR requirements.`;

    case 'employment':
      return basePrompt + `Create a comprehensive Employment Contract that includes:
- Position and job description
- Compensation and benefits
- Work schedule and location
- Confidentiality and non-compete clauses
- Intellectual property assignment
- Termination conditions
- Dispute resolution
- Governing law

Make sure the document is legally compliant for ${data.jurisdiction} jurisdiction and follows employment law requirements.`;

    case 'lease':
      return basePrompt + `Create a detailed Lease Agreement that includes:
- Property description and address
- Lease term and rent amount
- Security deposit and fees
- Tenant and landlord obligations
- Maintenance and repairs
- Utilities and services
- Pets and restrictions
- Termination and renewal
- Governing law

Make sure the document is legally compliant for ${data.jurisdiction} jurisdiction and follows landlord-tenant law.`;

    default:
      return basePrompt + `Create a professional legal document based on the provided information. Ensure it includes all necessary legal clauses, is properly formatted, and is compliant with ${data.jurisdiction} jurisdiction laws.`;
  }
}
