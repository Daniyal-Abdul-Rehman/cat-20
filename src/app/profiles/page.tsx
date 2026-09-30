'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const allProfiles = [
  { initials: 'TS', name: 'The Interpreter', primary: 'Thinker', secondary: 'Seeker' },
  { initials: 'TB', name: 'The Architect', primary: 'Thinker', secondary: 'Builder' },
  { initials: 'TN', name: 'The Counselor', primary: 'Thinker', secondary: 'Nurturer' },
  { initials: 'TK', name: 'The Visionary', primary: 'Thinker', secondary: 'Spark' },
  { initials: 'TW', name: 'The Grounded', primary: 'Thinker', secondary: 'Wanderer' },
  { initials: 'ST', name: 'The Explorer', primary: 'Seeker', secondary: 'Thinker' },
  { initials: 'SB', name: 'The Pathfinder', primary: 'Seeker', secondary: 'Builder' },
  { initials: 'SN', name: 'The Gentle Guide', primary: 'Seeker', secondary: 'Nurturer' },
  { initials: 'SK', name: 'The Catalyst', primary: 'Seeker', secondary: 'Spark' },
  { initials: 'SW', name: 'The Adventurer', primary: 'Seeker', secondary: 'Wanderer' },
  { initials: 'BT', name: 'The Strategist', primary: 'Builder', secondary: 'Thinker' },
  { initials: 'BS', name: 'The Constructor', primary: 'Builder', secondary: 'Seeker' },
  { initials: 'BN', name: 'The Provider', primary: 'Builder', secondary: 'Nurturer' },
  { initials: 'BK', name: 'The Creator', primary: 'Builder', secondary: 'Spark' },
  { initials: 'BW', name: 'The Stabilizer', primary: 'Builder', secondary: 'Wanderer' },
  { initials: 'NT', name: 'The Reflector', primary: 'Nurturer', secondary: 'Thinker' },
  { initials: 'NS', name: 'The Guide', primary: 'Nurturer', secondary: 'Seeker' },
  { initials: 'NB', name: 'The Supporter', primary: 'Nurturer', secondary: 'Builder' },
  { initials: 'NK', name: 'The Encourager', primary: 'Nurturer', secondary: 'Spark' },
  { initials: 'NW', name: 'The Haven', primary: 'Nurturer', secondary: 'Wanderer' },
  { initials: 'KT', name: 'The Innovator', primary: 'Spark', secondary: 'Thinker' },
  { initials: 'KS', name: 'The Inspirer', primary: 'Spark', secondary: 'Seeker' },
  { initials: 'KB', name: 'The Maker', primary: 'Spark', secondary: 'Builder' },
  { initials: 'KN', name: 'The Energizer', primary: 'Spark', secondary: 'Nurturer' },
  { initials: 'KW', name: 'The Voyager', primary: 'Spark', secondary: 'Wanderer' },
  { initials: 'WT', name: 'The Observer', primary: 'Wanderer', secondary: 'Thinker' },
  { initials: 'WS', name: 'The Seeker', primary: 'Wanderer', secondary: 'Seeker' },
  { initials: 'WB', name: 'The Traveler', primary: 'Wanderer', secondary: 'Builder' },
  { initials: 'WN', name: 'The Healer', primary: 'Wanderer', secondary: 'Nurturer' },
  { initials: 'WK', name: 'The Dreamer', primary: 'Wanderer', secondary: 'Spark' },
];

export default function Profiles() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] flex flex-col" style={{ color: '#1a1a1a' }}>
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1
                className="text-5xl lg:text-6xl font-bold mb-4"
                style={{ color: '#1a1a1a', fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                All 30 CAT-20 Profiles
              </h1>
              <div
                className="w-20 h-1 mx-auto"
                style={{ backgroundColor: '#C4A747' }}
              />
            </div>

            {/* Profiles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allProfiles.map((profile) => (
                <div
                  key={profile.initials}
                  className="rounded-xl border p-6 text-center"
                  style={{ borderColor: '#E8E4DD', backgroundColor: '#FFFFFF' }}
                >
                  <div className="text-3xl font-bold mb-2" style={{ color: '#4B3B8C' }}>
                    {profile.initials}
                  </div>
                  <div className="text-sm mb-2" style={{ color: '#C4A747' }}>✦</div>
                  <div className="text-lg font-semibold mb-2" style={{ color: '#1a1a1a' }}>
                    {profile.name}
                  </div>
                  <div className="text-sm" style={{ color: '#666666' }}>
                    {profile.primary} + {profile.secondary}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
