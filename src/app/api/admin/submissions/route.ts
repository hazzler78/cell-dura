import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    console.log('Checking Blob configuration:', {
      hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      hasStoreId: !!process.env.BLOB_STORE_ID
    });

    // List all blobs in the submissions directory
    console.log('Fetching submissions from directory: submissions/');
    const { blobs } = await list({ prefix: 'submissions/' });
    
    console.log(`Found ${blobs.length} submissions`);

    // Fetch and parse each submission
    const submissions = await Promise.all(
      blobs.map(async (blob) => {
        try {
          console.log(`Fetching submission from: ${blob.url}`);
          const response = await fetch(blob.url);
          if (!response.ok) {
            throw new Error(`Failed to fetch submission: ${response.statusText}`);
          }
          const submission = await response.json();
          return {
            ...submission,
            url: blob.url
          };
        } catch (error) {
          console.error(`Error fetching submission ${blob.url}:`, error);
          return null;
        }
      })
    );

    // Filter out failed submissions and sort by timestamp
    const validSubmissions = submissions
      .filter((sub): sub is NonNullable<typeof sub> => sub !== null)
      .sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    console.log(`Successfully processed ${validSubmissions.length} submissions`);

    return NextResponse.json({ submissions: validSubmissions });
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    
    // Check for specific Blob storage errors
    if (error instanceof Error) {
      if (error.message.includes('BLOB_READ_WRITE_TOKEN')) {
        return NextResponse.json(
          { error: "Storage configuration error - token missing or invalid" },
          { status: 500 }
        );
      }
      if (error.message.includes('STORE_ID')) {
        return NextResponse.json(
          { error: "Storage configuration error - store ID missing or invalid" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: "Failed to fetch submissions",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 