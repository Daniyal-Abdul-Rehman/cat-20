'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useAuthStore } from '@/store/authStore';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/account';
  const { login, clearError } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    clearError();
    setIsLoading(true);

    try {
      await login(email, password);
      router.push(redirect);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF]" style={{ color: '#1a1a1a' }}>
      <Navigation />
      
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 
              className="text-4xl font-bold mb-2"
              style={{ 
                color: '#1a1a1a',
                fontFamily: 'var(--font-playfair), serif'
              }}
            >
              Welcome Back
            </h1>
            <p 
              className="text-lg"
              style={{ 
                color: '#666666',
                fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              Sign in to access your CAT-20 account
            </p>
          </div>

          <div className="rounded-2xl border border-[#e5e0dc] bg-[#fdfbf8] p-8 shadow-[0_2px_8px_rgba(24,22,55,0.02)]">
            {error && (
              <div 
                className="mb-4 p-3 rounded-lg text-sm"
                style={{ 
                  backgroundColor: '#fee2e2',
                  color: '#dc2626',
                  fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: '#1a1a1a',
                    fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#e8e8e8] focus:outline-none focus:ring-2 focus:ring-[#4B3B8C] focus:border-transparent transition"
                  style={{ 
                    fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label 
                  htmlFor="password"
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: '#1a1a1a',
                    fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#e8e8e8] focus:outline-none focus:ring-2 focus:ring-[#4B3B8C] focus:border-transparent transition"
                  style={{ 
                    fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                  }}
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: '#4B3B8C',
                  fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p 
                className="text-sm"
                style={{ 
                  color: '#666666',
                  fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                Don't have an account?{' '}
                <Link 
                  href="/assessment"
                  className="font-medium hover:opacity-80"
                  style={{ color: '#4B3B8C' }}
                >
                  Take the assessment first
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm hover:opacity-80"
              style={{ 
                color: '#4B3B8C',
                fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}