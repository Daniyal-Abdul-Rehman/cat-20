'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Feedback() {
  const [formData, setFormData] = useState({
    category: '',
    feedback: '',
    email: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    alert('Thank you for your feedback! We appreciate your input.');
    setFormData({ category: '', feedback: '', email: '' });
  };

  return (
    <div className="min-h-screen bg-[#090711] text-white flex flex-col">
      <Navigation />
      
      <main className="flex-1 relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#8b5cf640,transparent_45%)]" />
        
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-flex rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                We Value Your Input
              </span>
              <h1 className="mt-8 text-5xl lg:text-6xl font-bold">
                Share Your Feedback
              </h1>
              <p className="mt-4 text-lg text-gray-400">
                Help us improve CAT-20
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 p-10 hover:border-violet-500/40 transition">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Feedback Category</label>
                  <select
                    className="w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/5 text-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="assessment">Assessment Questions</option>
                    <option value="results">Results & Interpretation</option>
                    <option value="website">Website Experience</option>
                    <option value="suggestion">Feature Suggestion</option>
                    <option value="bug">Bug Report</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Feedback</label>
                  <textarea
                    className="w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 h-32 bg-white/5 text-white placeholder-gray-500"
                    placeholder="Please share your thoughts, suggestions, or report any issues..."
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white/5 text-white placeholder-gray-500"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <p className="text-sm text-gray-500 mt-1">We'll only contact you if we need clarification</p>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white py-3 rounded-xl hover:scale-105 transition font-semibold">
                  Submit Feedback
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
