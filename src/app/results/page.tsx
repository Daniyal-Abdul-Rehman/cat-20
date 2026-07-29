'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Results() {
  return (
    <div className="min-h-screen bg-[#090711] text-white flex flex-col">
      <Navigation />
      
      <main className="flex-1 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#8b5cf640,transparent_45%)]" />
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                Your Assessment Results
              </span>
              <h1 className="mt-8 text-5xl lg:text-6xl font-bold">
                Your CAT-20 Results
              </h1>
              <p className="mt-4 text-lg text-gray-400">
                Discover Your Cognitive Patterns
              </p>
            </div>

            <div className="space-y-8">
              <div className="rounded-3xl border border-white/10 p-8 hover:border-violet-500/40 transition">
                <h2 className="text-2xl font-bold mb-4">Your Archetype</h2>
                <p className="text-2xl font-semibold text-violet-400">Coming Soon</p>
                <p className="text-gray-400 mt-2">
                  Your archetype will be calculated based on your assessment responses.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-white/10 p-8 hover:border-violet-500/40 transition">
                  <h3 className="text-xl font-bold mb-2">Primary Cluster</h3>
                  <p className="text-lg font-medium text-gray-400">Coming Soon</p>
                </div>
                <div className="rounded-3xl border border-white/10 p-8 hover:border-violet-500/40 transition">
                  <h3 className="text-xl font-bold mb-2">Secondary Cluster</h3>
                  <p className="text-lg font-medium text-gray-400">Coming Soon</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 p-8 hover:border-violet-500/40 transition">
                <h3 className="text-xl font-bold mb-4">Cluster Distribution</h3>
                <div className="h-64 flex items-center justify-center bg-[#0f1018] rounded-xl border border-white/5">
                  <p className="text-gray-500">Visualization Coming Soon</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 p-8 hover:border-violet-500/40 transition">
                <h3 className="text-xl font-bold mb-4">Recognition</h3>
                <p className="text-gray-400">
                  Personal insights based on your cognitive patterns will appear here.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-3xl border border-white/10 p-8 hover:border-violet-500/40 transition">
                  <h3 className="text-xl font-bold mb-4">Strengths</h3>
                  <p className="text-gray-400">
                    Your cognitive strengths will be highlighted here.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 p-8 hover:border-violet-500/40 transition">
                  <h3 className="text-xl font-bold mb-4">Growth Areas</h3>
                  <p className="text-gray-400">
                    Areas for personal development will be identified here.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-16 space-x-4">
              <Link href="/about" className="inline-block border border-violet-500/30 bg-violet-500/10 text-violet-300 px-8 py-3 rounded-xl hover:bg-violet-500/20 transition-colors">
                Learn More About CAT-20
              </Link>
              <button 
                onClick={() => window.location.href = '/assessment'}
                className="inline-block bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white px-8 py-3 rounded-xl hover:scale-105 transition font-semibold"
              >
                Retake Assessment
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
