'use client';

import React, { useEffect, useState } from 'react';
import { list } from '@vercel/blob';

interface Submission {
  url: string;
  name: string;
  email: string;
  company: string;
  message: string;
  timestamp: string;
  metadata: {
    ip: string;
    userAgent: string;
  };
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await fetch('/api/admin/submissions');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data = await response.json();
        setSubmissions(data.submissions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load submissions');
      } finally {
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Loading submissions...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Error</h1>
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Form Submissions</h1>
        
        <div className="grid gap-6">
          {submissions.map((submission, index) => (
            <div
              key={index}
              className="bg-dark-lighter p-6 rounded-lg border border-gray-800"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {submission.name}
                  </h3>
                  <p className="text-gray-400">{submission.email}</p>
                  <p className="text-gray-400">{submission.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {new Date(submission.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-gray-300">{submission.message}</p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800">
                <details className="text-sm text-gray-500">
                  <summary className="cursor-pointer hover:text-gray-400">
                    Metadata
                  </summary>
                  <div className="mt-2 space-y-1">
                    <p>IP: {submission.metadata.ip}</p>
                    <p>User Agent: {submission.metadata.userAgent}</p>
                    <p>Storage URL: {submission.url}</p>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 