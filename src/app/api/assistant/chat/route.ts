import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { openrouter } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { message, conversationHistory } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    // Build conversation context
    const systemPrompt = `You are a professional AI Legal Assistant specializing in USA and Canada legal systems. You provide accurate, helpful, and contextually appropriate legal guidance.

Your capabilities include:
- Contract analysis and review
- Legal document interpretation
- Risk assessment and identification
- Case law research and citation
- Legal terminology explanation
- Jurisdiction-specific guidance
- Document summarization
- Legal research assistance

Guidelines:
- Always provide accurate, up-to-date legal information
- Cite relevant laws, regulations, or case law when appropriate
- Explain complex legal concepts in clear, understandable terms
- Identify potential risks and red flags
- Suggest when professional legal counsel should be consulted
- Focus on USA and Canada legal frameworks
- Be helpful but always recommend professional review for complex matters

Remember: You are an AI assistant and cannot provide formal legal advice. Always recommend consulting with qualified legal professionals for important legal matters.`;

    // Build conversation messages
    const messages = [
      { role: 'system', content: systemPrompt }
    ];

    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg: any) => {
        if (msg.type === 'user') {
          messages.push({ role: 'user', content: msg.content });
        } else if (msg.type === 'assistant') {
          messages.push({ role: 'assistant', content: msg.content });
        }
      });
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // Generate response
    const completion = await openrouter.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet",
      messages: messages as any,
      max_tokens: 2000,
      temperature: 0.3
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I was unable to generate a response. Please try again.';

    // Generate relevant sources and suggestions
    const sources = generateRelevantSources(message);
    const suggestions = generateSuggestions(message, response);

    return NextResponse.json({
      response,
      sources,
      suggestions
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateRelevantSources(message: string): string[] {
  const sources: string[] = [];
  const lowerMessage = message.toLowerCase();

  // Contract-related sources
  if (lowerMessage.includes('contract') || lowerMessage.includes('agreement')) {
    sources.push('Contract Law - Uniform Commercial Code (UCC)');
    sources.push('Common Law Contract Principles');
  }

  // Employment-related sources
  if (lowerMessage.includes('employment') || lowerMessage.includes('employee') || lowerMessage.includes('workplace')) {
    sources.push('Employment Standards Act');
    sources.push('Human Rights Legislation');
    sources.push('Occupational Health and Safety Act');
  }

  // Privacy-related sources
  if (lowerMessage.includes('privacy') || lowerMessage.includes('data protection') || lowerMessage.includes('gdpr')) {
    sources.push('Personal Information Protection and Electronic Documents Act (PIPEDA)');
    sources.push('Provincial Privacy Legislation');
    sources.push('General Data Protection Regulation (GDPR)');
  }

  // Corporate law sources
  if (lowerMessage.includes('corporation') || lowerMessage.includes('company') || lowerMessage.includes('business')) {
    sources.push('Business Corporations Act');
    sources.push('Partnership Act');
    sources.push('Limited Liability Company (LLC) Regulations');
  }

  // Intellectual property sources
  if (lowerMessage.includes('intellectual property') || lowerMessage.includes('patent') || lowerMessage.includes('trademark') || lowerMessage.includes('copyright')) {
    sources.push('Patent Act');
    sources.push('Trademarks Act');
    sources.push('Copyright Act');
  }

  // Default sources if no specific match
  if (sources.length === 0) {
    sources.push('Legal Database - CanLII');
    sources.push('Case Law Repository');
    sources.push('Statutory Law Database');
  }

  return sources.slice(0, 3); // Return max 3 sources
}

function generateSuggestions(message: string, response: string): string[] {
  const suggestions: string[] = [];
  const lowerMessage = message.toLowerCase();

  // Contract-related suggestions
  if (lowerMessage.includes('contract') || lowerMessage.includes('agreement')) {
    suggestions.push('What are the key elements of a valid contract?');
    suggestions.push('How do I identify risky contract clauses?');
    suggestions.push('What should I look for in termination clauses?');
  }

  // Employment-related suggestions
  else if (lowerMessage.includes('employment') || lowerMessage.includes('employee')) {
    suggestions.push('What are the essential terms in an employment contract?');
    suggestions.push('How do I handle workplace discrimination issues?');
    suggestions.push('What are the notice requirements for termination?');
  }

  // Privacy-related suggestions
  else if (lowerMessage.includes('privacy') || lowerMessage.includes('data')) {
    suggestions.push('What are the key requirements of PIPEDA?');
    suggestions.push('How do I ensure GDPR compliance?');
    suggestions.push('What are the penalties for privacy violations?');
  }

  // General legal suggestions
  else {
    suggestions.push('How do I analyze legal documents for risks?');
    suggestions.push('What are the key elements of liability clauses?');
    suggestions.push('How do I ensure legal compliance?');
    suggestions.push('What should I look for in indemnification clauses?');
  }

  return suggestions.slice(0, 4); // Return max 4 suggestions
}
