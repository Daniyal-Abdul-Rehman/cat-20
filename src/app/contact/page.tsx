'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block border px-4 py-2 text-sm font-semibold uppercase tracking-widest" style={{ borderColor: '#C4A747', color: '#C4A747' }}>
                Get In Touch
              </span>
              <h1 className="mt-8 text-5xl lg:text-6xl font-bold">
                Contact Us
              </h1>
              <p className="mt-4 text-lg" style={{ color: '#666666' }}>
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div className="rounded-lg border p-10 transition" style={{ borderColor: '#E8E8E8' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-widest" style={{ color: '#1a1a1a' }}>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-300"
                    style={{ borderColor: '#E8E8E8', backgroundColor: '#F5F5F5', color: '#1a1a1a' }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-widest" style={{ color: '#1a1a1a' }}>Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-300"
                    style={{ borderColor: '#E8E8E8', backgroundColor: '#F5F5F5', color: '#1a1a1a' }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-widest" style={{ color: '#1a1a1a' }}>Subject</label>
                  <input
                    type="text"
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-300"
                    style={{ borderColor: '#E8E8E8', backgroundColor: '#F5F5F5', color: '#1a1a1a' }}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 uppercase tracking-widest" style={{ color: '#1a1a1a' }}>Message</label>
                  <textarea
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition duration-300 h-32"
                    style={{ borderColor: '#E8E8E8', backgroundColor: '#F5F5F5', color: '#1a1a1a' }}
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="w-full py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-semibold text-white shadow-lg" style={{ backgroundColor: '#4B3B8C' }}>
                  Send Message
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
