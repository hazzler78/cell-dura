import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { put } from '@vercel/blob';
import rateLimiter from '@/lib/rate-limiter';

export async function POST(request: Request) {
  let clientIp = 'unknown';
  
  try {
    // Log environment variables (safely)
    console.log('Blob storage configuration:', {
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      hasStoreId: !!process.env.BLOB_STORE_ID,
      hasPublicUrl: !!process.env.BLOB_PUBLIC_URL
    });

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

    // Create a submission object
    const submission = {
      data: {
        name,
        email,
        company,
        message
      },
      timestamp: new Date().toISOString(),
      metadata: {
        ip: clientIp,
        userAgent: request.headers.get('user-agent') || 'unknown',
        source: 'website_contact_form'
      }
    };

    // Generate a unique filename with timestamp for better sorting
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `submissions/${timestamp}-${Math.random().toString(36).substring(2)}.json`;
    
    console.log('Attempting to store submission:', filename);
    
    // Store in Blob - using compact JSON format
    const { url } = await put(filename, JSON.stringify(submission), {
      access: 'public',
      addRandomSuffix: false
    });

    console.log('Submission stored successfully at:', url);

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
      remaining: rateLimiter.getRemainingRequests(clientIp),
      submissionUrl: url
    });

  } catch (error) {
    console.error('Form submission error:', error);
    
    // Detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }

    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
        console.error('Blob storage token missing or invalid');
        return NextResponse.json(
          { error: "Storage configuration error" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: "Failed to submit form",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 