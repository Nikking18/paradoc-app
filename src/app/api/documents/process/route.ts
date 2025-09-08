import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { supabase } from '@/lib/supabase';
import { openrouter } from '@/lib/openrouter';
// import { huggingface } from '@/lib/huggingface';
// import { readFile } from 'fs/promises';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { documentId } = body;

    if (!documentId) {
      return NextResponse.json({ error: 'Document ID required' }, { status: 400 });
    }

    // Get user ID
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get document
    const { data: document, error: docError } = await supabase
      .from('documents')
      .select('*')
      .eq('id', documentId)
      .eq('user_id', user.id)
      .single();

    if (docError || !document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Update status to processing
    await supabase
      .from('documents')
      .update({ 
        status: 'processing',
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId);

    try {
      // Extract text from document (simplified - in production, use proper PDF/DOC parsers)
      const extractedText = await extractTextFromFile(document.file_path, document.file_type);
      
      // AI Analysis Pipeline
      const analysisResults = await performDocumentAnalysis(extractedText);

      // Update document with analysis results
      const { error: updateError } = await supabase
        .from('documents')
        .update({
          status: 'completed',
          content: extractedText,
          metadata: {
            ...document.metadata,
            extractedData: analysisResults.extractedData,
            riskScore: analysisResults.riskScore,
            summary: analysisResults.summary,
            processedAt: new Date().toISOString()
          },
          updated_at: new Date().toISOString()
        })
        .eq('id', documentId);

      if (updateError) {
        console.error('Error updating document:', updateError);
        throw new Error('Failed to update document');
      }

      return NextResponse.json({
        extractedData: analysisResults.extractedData,
        riskScore: analysisResults.riskScore,
        summary: analysisResults.summary,
        status: 'completed'
      });

    } catch (processingError) {
      console.error('Processing error:', processingError);
      
      // Update status to failed
      await supabase
        .from('documents')
        .update({ 
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('id', documentId);

      return NextResponse.json({ error: 'Failed to process document' }, { status: 500 });
    }

  } catch (error) {
    console.error('Document processing error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function extractTextFromFile(_filePath: string, _fileType: string): Promise<string> {
  // Simplified text extraction - in production, use proper libraries like:
  // - pdf-parse for PDF files
  // - mammoth for DOCX files
  // - antiword for DOC files
  
  try {
    // For now, return a placeholder text
    // In production, implement proper text extraction
    return `
    SAMPLE LEGAL DOCUMENT TEXT
    
    This is a sample contract between Party A and Party B.
    
    TERMS AND CONDITIONS:
    1. Payment terms: Net 30 days
    2. Delivery: Within 14 business days
    3. Liability: Limited to contract value
    4. Termination: Either party may terminate with 30 days notice
    
    INDEMNIFICATION:
    Party A agrees to indemnify Party B against all claims arising from...
    
    GOVERNING LAW:
    This agreement shall be governed by the laws of [Jurisdiction].
    `;
  } catch (error) {
    console.error('Text extraction error:', error);
    throw new Error('Failed to extract text from document');
  }
}

async function performDocumentAnalysis(text: string) {
  try {
    // 1. Extract key data using AI
    const extractionPrompt = `
    Analyze the following legal document and extract key information in JSON format:
    
    Document Text: ${text}
    
    Please extract:
    - Parties involved
    - Key terms and conditions
    - Payment terms
    - Delivery terms
    - Liability clauses
    - Termination clauses
    - Governing law
    - Any unusual or risky clauses
    
    Return the data in a structured JSON format.
    `;

    const extractionResponse = await openrouter.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        {
          role: "system",
          content: "You are a legal document analysis expert. Extract key information from legal documents and return structured JSON data."
        },
        {
          role: "user",
          content: extractionPrompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.1
    });

    const extractedData = JSON.parse(extractionResponse.choices[0]?.message?.content || '{}');

    // 2. Risk Assessment
    const riskPrompt = `
    Analyze the following legal document for potential risks and issues:
    
    Document Text: ${text}
    
    Identify:
    - High-risk clauses (unlimited liability, unfair terms, etc.)
    - Missing important clauses
    - Unusual or concerning language
    - Compliance issues
    
    Provide a risk score from 0-100 and detailed analysis.
    `;

    const riskResponse = await openrouter.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        {
          role: "system",
          content: "You are a legal risk assessment expert. Analyze documents for potential legal risks and provide detailed assessments."
        },
        {
          role: "user",
          content: riskPrompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.1
    });

    const riskAnalysis = riskResponse.choices[0]?.message?.content || '';

    // 3. Document Summary
    const summaryPrompt = `
    Provide a concise summary of the following legal document:
    
    Document Text: ${text}
    
    Include:
    - Document type and purpose
    - Key parties involved
    - Main terms and conditions
    - Important dates and deadlines
    - Key obligations and responsibilities
    `;

    const summaryResponse = await openrouter.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet",
      messages: [
        {
          role: "system",
          content: "You are a legal document summarization expert. Create clear, concise summaries of legal documents."
        },
        {
          role: "user",
          content: summaryPrompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.2
    });

    const summary = summaryResponse.choices[0]?.message?.content || '';

    // Calculate risk score (simplified)
    const riskScore = calculateRiskScore(riskAnalysis);

    return {
      extractedData,
      riskScore,
      summary,
      riskAnalysis
    };

  } catch (error) {
    console.error('Analysis error:', error);
    throw new Error('Failed to analyze document');
  }
}

function calculateRiskScore(riskAnalysis: string): number {
  // Simplified risk scoring based on keywords
  const highRiskKeywords = ['unlimited liability', 'no liability', 'force majeure', 'arbitration', 'confidentiality'];
  const mediumRiskKeywords = ['termination', 'indemnification', 'warranty', 'guarantee'];
  
  let score = 0;
  const lowerAnalysis = riskAnalysis.toLowerCase();
  
  highRiskKeywords.forEach(keyword => {
    if (lowerAnalysis.includes(keyword)) {
      score += 20;
    }
  });
  
  mediumRiskKeywords.forEach(keyword => {
    if (lowerAnalysis.includes(keyword)) {
      score += 10;
    }
  });
  
  return Math.min(score, 100);
}
