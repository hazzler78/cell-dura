import OpenAI from 'openai';
import { getQuantumResponse } from './quantum-responses';

// Initialize OpenAI client with error handling
let openai: OpenAI | null = null;
try {
  console.log('Client-side environment check:', {
    hasPublicKey: !!process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    keyPrefix: process.env.NEXT_PUBLIC_OPENAI_API_KEY?.substring(0, 8),
    environment: process.env.NODE_ENV
  });

  if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Note: In production, you should proxy through your backend
    });
    console.log('Client-side OpenAI initialized successfully');
  } else {
    console.warn('NEXT_PUBLIC_OPENAI_API_KEY is missing on client-side');
  }
} catch (error) {
  console.error('Client-side OpenAI initialization error:', error);
}

const AI_PERSONALITY = `You are Atlas, a friendly and knowledgeable AI consultant who specializes in helping businesses implement AI solutions. Your personality combines approachability with expertise.

Your traits:
- Friendly and conversational, using clear, jargon-free language
- Enthusiastic about helping businesses grow through AI
- Balance professional insights with relatable examples
- Share specific metrics and success stories when relevant
- Ask thoughtful follow-up questions to better understand needs
- Maintain a positive, solution-focused approach
- Use analogies to explain complex concepts simply
- Always end responses with an engaging question or next step

Current role: You're helping visitors understand how AI can practically benefit their business while making them feel comfortable and confident about implementation.`;

export async function getChatResponse(userMessage: string): Promise<string> {
  // If OpenAI is not initialized, use fallback responses
  if (!openai) {
    return getQuantumResponse(userMessage);
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      return getQuantumResponse(userMessage);
    }

    const data = await response.json();
    
    if (data.error) {
      return getQuantumResponse(userMessage);
    }

    return data.message;
  } catch (error) {
    console.error('Chat API Error:', error);
    return getQuantumResponse(userMessage);
  }
} 