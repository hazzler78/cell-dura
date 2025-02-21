import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { put } from '@vercel/blob';
import rateLimiter from '@/lib/rate-limiter';

export async function POST(request: Request) {
  let clientIp = 'unknown';
  
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
          message: "You've reached the maximum number of submissions. Please try again later.",
          resetTime
        },
        { status: 429 }
      );
    }

    const formData = await request.json();
    const { name, email, company, message } = formData;

    if (!name || !email || !company || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a simple submission object
    const submission = {
      name,
      email,
      company,
      message,
      timestamp: new Date().toISOString(),
      metadata: {
        ip: clientIp,
        userAgent: request.headers.get('user-agent') || 'unknown'
      }
    };

    // Store in Blob with a simple filename
    const { url } = await put(
      `submissions/${Date.now()}.json`,
      JSON.stringify(submission),
      {
        access: 'public',
        addRandomSuffix: true // Adds a random suffix to prevent collisions
      }
    );

    console.log('Submission stored successfully:', url);

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      remaining: rateLimiter.getRemainingRequests(clientIp)
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    // More detailed error handling
    if (error instanceof Error) {
      if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
        console.error('Blob storage token missing or invalid');
        return NextResponse.json(
          { error: "Server configuration error" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to submit form" },
      { status: 500 }
    );
  }
} 