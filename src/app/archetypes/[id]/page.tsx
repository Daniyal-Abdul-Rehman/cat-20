import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { getArchetypeById } from '@/data/archetypes';
import { notFound } from 'next/navigation';

export default async function ArchetypePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const archetype = getArchetypeById(id);

  if (!archetype) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />
      
      <main className="flex-1">
        <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <Link 
                href="/archetypes" 
                className="inline-flex items-center gap-2 text-sm font-medium mb-6 transition-colors hover:opacity-70"
                style={{ color: '#666666' }}
              >
                ← Back to Archetypes
              </Link>
              
              <div className="inline-block border px-4 py-2 text-sm font-semibold uppercase tracking-widest mb-6" style={{ borderColor: '#C4A747', color: '#C4A747' }}>
                Cognitive Archetype
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                {archetype.name}
              </h1>
              <p className="text-2xl font-semibold mb-6" style={{ color: '#C4A747' }}>
                {archetype.tagline}
              </p>
              <div className="w-20 h-1 mb-8" style={{ backgroundColor: '#C4A747' }} />
              <p className="text-lg leading-8" style={{ color: '#666666' }}>
                {archetype.description}
              </p>
            </div>

            {/* Strengths */}
            <div className="rounded-lg border p-8 transition hover:shadow-lg mb-8" style={{ borderColor: '#E8E8E8' }}>
              <h2 className="text-2xl font-bold mb-6">Strengths</h2>
              <ul className="space-y-4">
                {archetype.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3" style={{ color: '#666666' }}>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#C4A747' }} />
                    <span className="leading-7">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth Areas */}
            <div className="rounded-lg border p-8 transition hover:shadow-lg mb-8" style={{ borderColor: '#E8E8E8' }}>
              <h2 className="text-2xl font-bold mb-6">Growth Areas</h2>
              <ul className="space-y-4">
                {archetype.growthAreas.map((area, index) => (
                  <li key={index} className="flex items-start gap-3" style={{ color: '#666666' }}>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#4B3B8C' }} />
                    <span className="leading-7">{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Best Environments */}
            <div className="rounded-lg border p-8 transition hover:shadow-lg mb-8" style={{ borderColor: '#E8E8E8' }}>
              <h2 className="text-2xl font-bold mb-6">Best Environments</h2>
              <ul className="space-y-4">
                {archetype.bestEnvironments.map((env, index) => (
                  <li key={index} className="flex items-start gap-3" style={{ color: '#666666' }}>
                    <span className="flex-shrink-0 w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#C4A747' }} />
                    <span className="leading-7">{env}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decision Style */}
            <div className="rounded-lg border p-8 transition hover:shadow-lg mb-8" style={{ borderColor: '#E8E8E8' }}>
              <h2 className="text-2xl font-bold mb-4">Decision Style</h2>
              <p className="leading-7" style={{ color: '#666666' }}>
                {archetype.decisionStyle}
              </p>
            </div>

            {/* Communication Style */}
            <div className="rounded-lg border p-8 transition hover:shadow-lg mb-8" style={{ borderColor: '#E8E8E8' }}>
              <h2 className="text-2xl font-bold mb-4">Communication Style</h2>
              <p className="leading-7" style={{ color: '#666666' }}>
                {archetype.communicationStyle}
              </p>
            </div>

            {/* CTA */}
            <div className="text-center mt-16">
              <Link 
                href="/assessment" 
                className="inline-block px-10 py-4 font-semibold rounded-lg hover:scale-105 transition-transform duration-300 text-white shadow-lg"
                style={{ backgroundColor: '#4B3B8C' }}
              >
                Discover Your Archetype
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
