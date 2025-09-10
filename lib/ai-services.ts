import OpenAI from 'openai';
import axios from 'axios';

// OpenRouter client
const openRouterClient = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Hugging Face API configuration
const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co';
const HUGGINGFACE_HEADERS = {
  'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
  'Content-Type': 'application/json',
};

// Legal document templates and prompts
const LEGAL_DOCUMENT_PROMPTS = {
  contract: {
    system: "You are a legal AI assistant specializing in contract drafting for US and Canadian jurisdictions. Generate clear, legally sound contracts with proper clauses and terminology.",
    template: "Draft a {type} contract for {jurisdiction} jurisdiction with the following requirements: {requirements}. Include standard legal clauses, terms and conditions, and ensure compliance with local laws."
  },
  agreement: {
    system: "You are a legal AI assistant specializing in legal agreements. Create comprehensive agreements that protect all parties involved.",
    template: "Create a {type} agreement for {jurisdiction} jurisdiction with these specifications: {requirements}. Include necessary legal protections, obligations, and termination clauses."
  },
  brief: {
    system: "You are a legal AI assistant specializing in legal brief writing. Create well-structured, persuasive legal briefs with proper citations and arguments.",
    template: "Draft a legal brief for {jurisdiction} jurisdiction regarding: {requirements}. Include case law references, legal arguments, and proper formatting."
  },
  template: {
    system: "You are a legal AI assistant creating reusable legal document templates with customizable fields.",
    template: "Create a legal document template for {type} in {jurisdiction} jurisdiction with these parameters: {requirements}. Include placeholder fields for customization."
  },
  other: {
    system: "You are a legal AI assistant specializing in general legal document creation with proper formatting and legal terminology.",
    template: "Create a legal document for {jurisdiction} jurisdiction with the following requirements: {requirements}. Ensure proper legal formatting and compliance."
  }
};

// AI Document Generation
export async function generateLegalDocument(
  prompt: string,
  type: 'contract' | 'agreement' | 'brief' | 'template' | 'other',
  jurisdiction: 'US' | 'CA',
  context?: Record<string, unknown>
): Promise<string> {
  try {
    const documentPrompt = LEGAL_DOCUMENT_PROMPTS[type] || LEGAL_DOCUMENT_PROMPTS.contract;
    
    const systemMessage = `${documentPrompt.system} Always ensure compliance with ${jurisdiction === 'US' ? 'United States federal and state' : 'Canadian federal and provincial'} laws.`;
    
    const userMessage = `${prompt}\n\nAdditional context: ${JSON.stringify(context || {})}`;

    const completion = await openRouterClient.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 4000,
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content || 'Failed to generate document';
  } catch (error) {
    console.error('Error generating legal document:', error);
    throw new Error('Failed to generate legal document');
  }
}

// AI Chatbot for Legal Advice
export async function getLegalAdvice(
  message: string,
  context?: Array<{ role: 'user' | 'assistant'; content: string }>,
  documentContext?: string
): Promise<string> {
  try {
    const systemMessage = `You are a knowledgeable legal AI assistant specializing in US and Canadian law. Provide helpful, accurate legal guidance while always recommending users consult with qualified attorneys for specific legal matters. Be conversational but professional.

${documentContext ? `Document context: ${documentContext}` : ''}

Important: Always include appropriate disclaimers about seeking professional legal counsel for specific situations.`;

    const messages = [
      { role: 'system' as const, content: systemMessage },
      ...(context || []),
      { role: 'user' as const, content: message }
    ];

    const completion = await openRouterClient.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages,
      max_tokens: 1500,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'I apologize, but I cannot provide a response at this time. Please try again.';
  } catch (error) {
    console.error('Error getting legal advice:', error);
    throw new Error('Failed to get legal advice');
  }
}

// Document Summarization
export async function summarizeDocument(
  content: string,
  type: 'brief' | 'detailed' | 'key_points' = 'brief'
): Promise<string> {
  try {
    let systemMessage = '';
    
    switch (type) {
      case 'brief':
        systemMessage = 'Provide a concise 2-3 sentence summary of the key points in this legal document.';
        break;
      case 'detailed':
        systemMessage = 'Provide a comprehensive summary of this legal document, including main provisions, obligations, rights, and important clauses.';
        break;
      case 'key_points':
        systemMessage = 'Extract and list the key points, important clauses, and critical information from this legal document in bullet point format.';
        break;
    }

    const completion = await openRouterClient.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: `Please summarize this legal document:\n\n${content}` }
      ],
      max_tokens: type === 'detailed' ? 2000 : 1000,
      temperature: 0.3,
    });

    return completion.choices[0]?.message?.content || 'Failed to summarize document';
  } catch (error) {
    console.error('Error summarizing document:', error);
    throw new Error('Failed to summarize document');
  }
}

// Legal Document Lookup
export async function lookupLegalInformation(
  query: string,
  jurisdiction: 'US' | 'CA' = 'US',
  category: 'statutes' | 'templates' | 'case_law' | 'all' = 'all'
): Promise<{
  query: string;
  jurisdiction: string;
  category: string;
  results: string;
  sources: string[];
  timestamp: string;
}> {
  try {
    const systemMessage = `You are a legal research assistant. Search for and provide relevant legal information based on the query. Focus on ${jurisdiction === 'US' ? 'United States' : 'Canadian'} law and ${category === 'all' ? 'all legal resources' : category}.

Provide:
1. Relevant statutes or regulations
2. Key legal principles
3. Important case law (if applicable)
4. Practical guidance
5. Citations and references

Format the response in a structured, easy-to-read format.`;

    const completion = await openRouterClient.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: `Research query: ${query}\nJurisdiction: ${jurisdiction}\nCategory: ${category}` }
      ],
      max_tokens: 2500,
      temperature: 0.3,
    });

    const response = completion.choices[0]?.message?.content || 'No results found';
    
    return {
      query,
      jurisdiction,
      category,
      results: response,
      sources: extractSources(response),
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error looking up legal information:', error);
    throw new Error('Failed to lookup legal information');
  }
}

// Risk Assessment for Legal Documents
export async function assessDocumentRisk(content: string): Promise<{
  riskScore: number;
  analysis: string;
  timestamp: string;
  recommendations: string[];
}> {
  try {
    const systemMessage = `You are a legal risk assessment AI. Analyze the provided legal document and identify potential risks, problematic clauses, and areas of concern. 

Provide:
1. Overall risk score (1-10, where 10 is highest risk)
2. Specific risk areas identified
3. Problematic clauses or terms
4. Recommendations for improvement
5. Compliance concerns

Be thorough but concise in your analysis.`;

    const completion = await openRouterClient.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: `Please assess the legal risks in this document:\n\n${content}` }
      ],
      max_tokens: 2000,
      temperature: 0.3,
    });

    const analysis = completion.choices[0]?.message?.content || 'Risk assessment failed';
    
    // Extract risk score using regex
    const riskScoreMatch = analysis.match(/risk score[:\s]*(\d+)/i);
    const riskScore = riskScoreMatch ? parseInt(riskScoreMatch[1]) : 5;

    return {
      riskScore,
      analysis,
      timestamp: new Date().toISOString(),
      recommendations: extractRecommendations(analysis),
    };
  } catch (error) {
    console.error('Error assessing document risk:', error);
    throw new Error('Failed to assess document risk');
  }
}

// Hugging Face Document Classification (Alternative AI Service)
export async function classifyDocument(content: string): Promise<{
  classification: string;
  confidence: number;
  method: string;
}> {
  try {
    const response = await axios.post(
      `${HUGGINGFACE_API_URL}/models/microsoft/DialoGPT-medium`,
      {
        inputs: `Classify this legal document type: ${content.substring(0, 500)}`,
        parameters: {
          max_length: 100,
          temperature: 0.3,
        }
      },
      { headers: HUGGINGFACE_HEADERS }
    );

    return response.data;
  } catch (error) {
    console.error('Error classifying document with Hugging Face:', error);
    // Fallback to OpenRouter if Hugging Face fails
    return await classifyWithOpenRouter(content);
  }
}

// Fallback classification using OpenRouter
async function classifyWithOpenRouter(content: string): Promise<{
  classification: string;
  confidence: number;
  method: string;
}> {
  try {
    const completion = await openRouterClient.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'system',
          content: 'Classify this legal document into one of these categories: contract, agreement, brief, template, or other. Provide confidence score and reasoning.'
        },
        { role: 'user', content: content.substring(0, 1000) }
      ],
      max_tokens: 200,
      temperature: 0.1,
    });

    return {
      classification: completion.choices[0]?.message?.content || 'other',
      confidence: 0.8,
      method: 'openrouter_fallback'
    };
  } catch (error) {
    console.error('Error in fallback classification:', error);
    return {
      classification: 'other',
      confidence: 0.5,
      method: 'default'
    };
  }
}

// Helper function to extract sources from AI response
function extractSources(text: string): string[] {
  const sources: string[] = [];
  
  // Look for common citation patterns
  const citationPatterns = [
    /\d+\s+U\.S\.C\.?\s+§?\s*\d+/g, // USC citations
    /\d+\s+C\.F\.R\.?\s+§?\s*\d+/g, // CFR citations
    /\d+\s+F\.\d+d?\s+\d+/g, // Federal Reporter citations
    /[A-Z][a-z]+\s+v\.\s+[A-Z][a-z]+/g, // Case names
  ];

  citationPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      sources.push(...matches);
    }
  });

  return [...new Set(sources)]; // Remove duplicates
}

// Helper function to extract recommendations from risk assessment
function extractRecommendations(analysis: string): string[] {
  const recommendations: string[] = [];
  
  // Look for recommendation patterns
  const lines = analysis.split('\n');
  lines.forEach(line => {
    if (line.toLowerCase().includes('recommend') || line.toLowerCase().includes('suggest')) {
      recommendations.push(line.trim());
    }
  });

  return recommendations;
}

// Usage tracking for billing
export async function logAIUsage(
  userId: string,
  service: string,
  tokensUsed: number,
  cost?: number
) {
  try {
    // This could be stored in a separate usage tracking table
    // For now, we'll log it as an audit event
    await import('./supabase').then(({ supabaseAdmin }) => {
      return supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: userId,
          action: 'AI_SERVICE_USED',
          description: `Used ${service} AI service`,
          metadata: {
            service,
            tokensUsed,
            cost: cost || 0,
            timestamp: new Date().toISOString(),
          },
        });
    });
  } catch (error) {
    console.error('Error logging AI usage:', error);
  }
}
