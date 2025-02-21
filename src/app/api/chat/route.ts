import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import OpenAI from 'openai';
import { getQuantumResponse } from '@/lib/quantum-responses';
import rateLimiter from '@/lib/rate-limiter';

// Initialize OpenAI client with error handling
let openai: OpenAI | null = null;
try {
  console.log('Server-side environment check:', {
    hasApiKey: !!process.env.OPENAI_API_KEY,
    keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 8),
    environment: process.env.NODE_ENV
  });

  if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    console.log('Server-side OpenAI initialized successfully');
  } else {
    console.warn('OPENAI_API_KEY is missing on server-side');
  }
} catch (error) {
  console.error('Server-side OpenAI initialization error:', error);
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

// Clean up markdown formatting
function cleanResponse(text: string): string {
  return text
    .replace(/\*\*/g, '') // Remove bold markers
    .replace(/\n\s*-\s*/g, '\n• ') // Replace markdown lists with bullet points
    .trim();
}

export async function POST(request: Request) {
  let clientIp = 'unknown';
  let message: string;
  
  try {
    // Get IP address from headers
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    if (forwardedFor) {
      clientIp = forwardedFor.split(',')[0];
    }

    // Check rate limit
    if (rateLimiter.isRateLimited(clientIp)) {
      const resetTime = rateLimiter.getResetTime(clientIp);
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: "You've reached the maximum number of requests. Please try again later.",
          resetTime
        },
        { status: 429 }
      );
    }

    const { message: userMessage } = await request.json();
    message = userMessage;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // If OpenAI is not initialized, log and use fallback
    if (!openai) {
      console.warn('Server-side OpenAI not initialized, using fallback for:', message);
      return NextResponse.json({
        message: getQuantumResponse(message),
        remaining: rateLimiter.getRemainingRequests(clientIp)
      });
    }

    console.log('Attempting OpenAI chat completion with model: gpt-4o-mini');
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: AI_PERSONALITY },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    console.log('OpenAI response received successfully');
    return NextResponse.json({
      message: cleanResponse(response.choices[0].message.content || ''),
      remaining: rateLimiter.getRemainingRequests(clientIp)
    });
  } catch (error) {
    console.error('Server-side API Error:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    // Check if it's an OpenAI API error
    if ((error as any)?.response?.data) {
      console.error('OpenAI API Error details:', (error as any).response.data);
    }
    return NextResponse.json({
      message: getQuantumResponse(message!),
      remaining: rateLimiter.getRemainingRequests(clientIp),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 