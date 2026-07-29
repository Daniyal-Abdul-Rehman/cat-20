import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { archetypes } from '@/data/archetypes';

export default function Archetypes() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block border px-4 py-2 text-sm font-semibold uppercase tracking-widest" style={{ borderColor: '#C4A747', color: '#C4A747' }}>
                Cognitive Patterns
              </span>
              <h1 className="mt-8 text-5xl lg:text-6xl font-bold">
                CAT-20 Archetypes
              </h1>
              <p className="mt-4 text-lg" style={{ color: '#666666' }}>
                Discover the Different Cognitive Patterns and Archetypes
              </p>
            </div>

            <div className="space-y-8">
              {archetypes.map((archetype) => (
                <Link 
                  key={archetype.id} 
                  href={`/archetypes/${archetype.id}`}
                  className="block rounded-lg border p-8 transition hover:shadow-lg"
                  style={{ borderColor: '#E8E8E8' }}
                >
                  <h2 className="text-2xl font-bold mb-3">{archetype.name}</h2>
                  <p className="text-lg font-semibold mb-4" style={{ color: '#C4A747' }}>
                    {archetype.tagline}
                  </p>
                  <p className="leading-7" style={{ color: '#666666' }}>
                    {archetype.description}
                  </p>
                </Link>
              ))}
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
