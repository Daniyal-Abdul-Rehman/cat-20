import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#FAF6EF] border-t border-gray-200">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-2" style={{ color: '#1a1a1a' }}>CAT-<span className="text-2xl font-bold" style={{ color: '#4B3B8C' }}>20</span></h3>
            <p style={{ color: '#666666' }}>Discover Your Recurring Cognitive Patterns.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3" style={{ color: '#1a1a1a' }}>Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="transition-colors" style={{ color: '#666666' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors" style={{ color: '#666666' }}>
                  About CAT-20
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="transition-colors" style={{ color: '#666666' }}>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/archetypes" className="transition-colors" style={{ color: '#666666' }}>
                  Archetypes
                </Link>
              </li>
              <li>
                <Link href="/insights" className="transition-colors" style={{ color: '#666666' }}>
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors" style={{ color: '#666666' }}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3" style={{ color: '#1a1a1a' }}>Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/assessment" className="transition-colors" style={{ color: '#666666' }}>
                  Take Assessment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors" style={{ color: '#666666' }}>
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="transition-colors" style={{ color: '#666666' }}>
                  Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
