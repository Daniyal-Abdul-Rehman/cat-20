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
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block border px-4 py-2 text-sm font-semibold uppercase tracking-widest" style={{ borderColor: '#C4A747', color: '#C4A747' }}>
                We Value Your Input
              </span>
              <h1 className="mt-8 text-5xl lg:text-6xl font-bold" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
                Share Your Feedback
              </h1>
              <p className="mt-4 text-lg" style={{ color: '#666666' }}>
                Help us improve CAT-20
              </p>
            </div>

            <div className="rounded-lg border p-10 transition bg-white hover:shadow-xl" style={{ borderColor: '#E8E8E8' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-widest" style={{ color: '#1a1a1a' }}>Feedback Category</label>
                  <select
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-300"
                    style={{ borderColor: '#E8E8E8', backgroundColor: '#FFFFFF', color: '#1a1a1a' }}
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
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-widest" style={{ color: '#1a1a1a' }}>Your Feedback</label>
                  <textarea
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-300 h-32"
                    style={{ borderColor: '#E8E8E8', backgroundColor: '#FFFFFF', color: '#1a1a1a' }}
                    placeholder="Please share your thoughts, suggestions, or report any issues..."
                    value={formData.feedback}
                    onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-widest" style={{ color: '#1a1a1a' }}>Email (Optional)</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-300"
                    style={{ borderColor: '#E8E8E8', backgroundColor: '#FFFFFF', color: '#1a1a1a' }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <p className="text-sm mt-1" style={{ color: '#666666' }}>We'll only contact you if we need clarification</p>
                </div>

                <button type="submit" className="w-full py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-semibold text-white shadow-lg" style={{ backgroundColor: '#4B3B8C' }}>
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
