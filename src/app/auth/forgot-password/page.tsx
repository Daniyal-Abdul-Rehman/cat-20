'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Mail, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useForgotPasswordForm } from '@/hooks/useFormValidation';
import { useAuthStore } from '@/store/authStore';

export default function ForgotPassword() {
  const router = useRouter();
  const { register, handleSubmit, errors, isSubmitting, validation } = useForgotPasswordForm();
  const { forgotPasswordOTP, error, isLoading, clearError } = useAuthStore();

  const onSubmit = async (data: { email: string }) => {
    try {
      clearError();
      await forgotPasswordOTP(data.email);
      router.push('/auth/otp-confirmation');
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-24 lg:py-32 relative overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <img
              src="/edited_image.png"
              alt=""
              className="absolute right-0 top-0 w-[85%] h-full object-cover"
            />
            {/* Fade overlay for text blending */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(
                    to right,
                    #FAF6EF 35%,
                    rgba(250,246,239,0.9) 45%,
                    rgba(250,246,239,0.5) 60%,
                    transparent 75%
                  ),
                  linear-gradient(
                    to bottom,
                    #FAF6EF 8%,
                    rgba(250,246,239,0.85) 18%,
                    rgba(250,246,239,0.5) 35%,
                    transparent 55%
                  ),
                  linear-gradient(
                    to top,
                    #FAF6EF 8%,
                    rgba(250,246,239,0.85) 18%,
                    rgba(250,246,239,0.5) 35%,
                    transparent 55%
                  )
                `,
              }}
            />
          </div>

          <div className="relative max-w-9xl mx-auto z-10">
            <div className="grid lg:grid-cols-7 gap-4 items-start">
              {/* Left Content */}
              <div className="col-span-4 lg:pl-0 pl-0">
                <div className="mb-8 flex flex-col items-start">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-[1px] bg-[#C4A747]"></div>
                    <span className="text-[12px] font-bold uppercase tracking-[0.35em] text-[#C4A747]">Reset Password</span>
                  </div>
                </div>

                <h1 className="text-5xl lg:text-5xl font-serif leading-tight mb-8" style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  Forgot your
                  <br />
                  <span className="italic" style={{ color: '#4B3B8C' }}>password?</span>
                </h1>

                <div className="flex items-start gap-4 text-lg lg:text-xl leading-relaxed" style={{ color: '#444444', fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                  <div className="w-12 h-[1px] bg-[#C4A747] mt-3 hidden lg:block"></div>
                  <p className="max-w-lg">
                    No worries. It happens to the best of us.
                    <br />
                    <br />
                    Enter your email address and we'll send you a verification code to reset your password and get you back to exploring your cognitive patterns.
                  </p>
                </div>
              </div>

              {/* Right Content - Forgot Password Form */}
              <div className="col-span-3 lg:pr-0 pr-0">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5" style={{ color: '#C4A747' }} />
                    <p className="text-sm font-semibold" style={{ color: '#C4A747' }}>
                      Reset Your Password
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#1a1a1a' }}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          {...register('email', validation.email)}
                          className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-[#C4A747]'
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Error Display */}
                    {error && (
                      <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                        <p className="text-sm text-red-600">{error}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading || isSubmitting}
                      className="w-full py-4 rounded-lg font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      style={{ backgroundColor: '#4B3B8C' }}
                    >
                      {isLoading || isSubmitting ? 'Sending...' : 'Send Verification Code'}
                      {!isLoading && !isSubmitting && <ArrowRight className="w-5 h-5" />}
                    </button>
                  </form>

                  {/* Back to Sign In Link */}
                  <div className="mt-6">
                    <Link 
                      href="/auth/signin" 
                      className="flex items-center gap-2 text-sm font-medium hover:underline transition-colors"
                      style={{ color: '#4B3B8C' }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}