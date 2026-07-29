import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Insights() {
  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block border px-4 py-2 text-sm font-semibold uppercase tracking-widest" style={{ borderColor: '#C4A747', color: '#C4A747' }}>
                Learn More
              </span>
              <h1 className="mt-8 text-5xl lg:text-6xl font-bold">
                Cognitive Insights
              </h1>
              <p className="mt-4 text-lg" style={{ color: '#666666' }}>
                Deepen your understanding of cognitive patterns
              </p>
            </div>

            <div className="space-y-8">
              <div className="rounded-lg border p-8 transition hover:shadow-lg" style={{ borderColor: '#E8E8E8' }}>
                <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                <p style={{ color: '#666666' }}>
                  We are building a comprehensive library of insights about cognitive patterns, decision-making, and personal growth. This section will feature articles, research, and practical applications of the CAT-20 framework.
                </p>
              </div>

              <div className="rounded-lg border p-8 transition hover:shadow-lg" style={{ borderColor: '#E8E8E8' }}>
                <h3 className="text-xl font-bold mb-3">What to Expect</h3>
                <ul className="list-disc list-inside space-y-2" style={{ color: '#666666' }}>
                  <li>In-depth articles on cognitive science</li>
                  <li>Practical tips for leveraging your patterns</li>
                  <li>Research and case studies</li>
                  <li>Interviews with cognitive experts</li>
                </ul>
              </div>

              <div className="rounded-lg border p-8 transition hover:shadow-lg" style={{ borderColor: '#E8E8E8' }}>
                <h3 className="text-xl font-bold mb-3">Start Your Journey</h3>
                <p className="mb-4" style={{ color: '#666666' }}>
                  Take the CAT-20 assessment to get personalized insights based on your unique cognitive patterns.
                </p>
              </div>
            </div>

            <div className="text-center mt-16">
              <Link 
                href="/assessment" 
                className="inline-block px-8 py-4 font-semibold rounded-lg hover:scale-105 transition-transform duration-300 text-white shadow-lg"
                style={{ backgroundColor: '#4B3B8C' }}
              >
                Take the Assessment
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
