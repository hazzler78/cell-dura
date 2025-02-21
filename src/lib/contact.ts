import type { FormData } from './validation';

export interface SubmissionResponse {
  success: boolean;
  message: string;
}

export const submitContactForm = async (data: FormData): Promise<SubmissionResponse> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit form');
    }

    return {
      success: true,
      message: result.message || 'Thank you for your message! We will get back to you soon.',
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const formatSubmissionData = (data: FormData) => {
  return {
    ...data,
    submittedAt: new Date().toISOString(),
    source: 'Website Contact Form',
  };
}; 