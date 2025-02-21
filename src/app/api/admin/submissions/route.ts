import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    // List all blobs in the submissions directory
    const { blobs } = await list({ prefix: 'submissions/' });

    // Fetch and parse each submission
    const submissions = await Promise.all(
      blobs.map(async (blob) => {
        const response = await fetch(blob.url);
        const submission = await response.json();
        return {
          ...submission,
          url: blob.url
        };
      })
    );

    // Sort submissions by timestamp, newest first
    submissions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
} 