'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancelled() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);

  useEffect(() => {
    const session = searchParams.get('session_id');
    const urlAssessmentId = searchParams.get('assessmentId');
    setSessionId(session);
    
    // Try to get assessment ID from URL first, then from localStorage
    if (urlAssessmentId) {
      setAssessmentId(urlAssessmentId);
    } else {
      const storedAssessmentId = localStorage.getItem('pending_assessment_id');
      if (storedAssessmentId) {
        setAssessmentId(storedAssessmentId);
      }
    }
    
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 animate-spin rounded-full border-4 border-[#4B3B8C] border-t-transparent mx-auto mb-4"></div>
          <p style={{ color: '#1a1a1a' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
            Payment Cancelled
          </h1>

          <p className="text-gray-600 mb-8">
            Your payment was cancelled. You can try again anytime to unlock your premium profile.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => {
                if (assessmentId) {
                  router.push(`/payment?assessmentId=${assessmentId}`);
                } else {
                  router.back();
                }
              }}
              className="block w-full py-4 rounded-lg font-semibold text-white transition-transform hover:scale-105"
              style={{ backgroundColor: '#4B3B8C' }}
            >
              <ArrowLeft className="inline-block mr-2 w-5 h-5" />
              Try Again
            </button>

            <Link
              href={assessmentId ? `/assessment/result?assessmentId=${assessmentId}` : '/assessment/result'}
              className="block w-full py-4 rounded-lg font-semibold border-2 transition-colors hover:bg-gray-50"
              style={{ color: '#4B3B8C', borderColor: '#4B3B8C' }}
            >
              Return to Results
            </Link>
          </div>

          {sessionId && (
            <p className="mt-6 text-xs text-gray-400">
              Session ID: {sessionId}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}