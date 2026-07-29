'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isArchetypesOpen, setIsArchetypesOpen] = useState(false);

  const isActive = (path: string) => pathname === path;
  const isArchetypeActive = () => pathname.startsWith('/archetypes/') && pathname !== '/archetypes';

  return (
    <nav className="bg-[#FAF6EF] relative z-50 sticky top-0">
      <div className="max-w-9xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex flex-col">
              <span className="text-4xl font-bold" style={{ color: '#1a1a1a' }}>CAT-<span className="text-5xl font-bold" style={{ color: '#4B3B8C' }}>20</span></span>
              <span className="text-xs" style={{ color: '#666666', letterSpacing: '0.05em' }}>COGNITIVE ARCHETYPE TEST</span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`font-medium text-sm px-4 py-2 transition-colors ${isActive('/') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`font-medium text-sm px-4 py-2 transition-colors ${isActive('/about') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/about') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              About CAT-20
            </Link>
            <Link 
              href="/how-it-works" 
              className={`font-medium text-sm px-4 py-2 transition-colors ${isActive('/how-it-works') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/how-it-works') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              How It Works
            </Link>
            
            {/* Archetypes Dropdown */}
            <div className="relative group">
              <button 
                className={`font-medium text-sm px-4 py-2 flex items-center gap-1 transition-colors ${isArchetypeActive() ? 'border-b-2' : ''}`}
                style={{ color: isArchetypeActive() ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
              >
                Archetypes
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                <Link href="/archetypes/visionary" className={`block px-4 py-2 transition-colors ${isActive('/archetypes/visionary') ? 'bg-gray-50' : ''}`} style={{ color: '#1a1a1a' }}>
                  The Visionary
                </Link>
                <Link href="/archetypes/analyst" className={`block px-4 py-2 transition-colors ${isActive('/archetypes/analyst') ? 'bg-gray-50' : ''}`} style={{ color: '#1a1a1a' }}>
                  The Analyst
                </Link>
                <Link href="/archetypes/connector" className={`block px-4 py-2 transition-colors ${isActive('/archetypes/connector') ? 'bg-gray-50' : ''}`} style={{ color: '#1a1a1a' }}>
                  The Connector
                </Link>
              </div>
            </div>

            <Link 
              href="/insights" 
              className={`font-medium text-sm px-4 py-2 transition-colors ${isActive('/insights') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/insights') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              Insights
            </Link>
            <Link 
              href="/faq" 
              className={`font-medium text-sm px-4 py-2 transition-colors ${isActive('/faq') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/faq') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              FAQ
            </Link>
          </div>

          {/* Take Test Again Button - Right */}
          <div className="hidden lg:flex items-center">
            <Link 
              href="/assessment" 
              className="px-8 py-3 font-semibold rounded-lg hover:scale-105 transition transform text-white"
              style={{ backgroundColor: '#4B3B8C' }}
            >
              Take Test Again
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: '#1a1a1a' }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#FAF6EF] border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/about') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/about') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              About CAT-20
            </Link>
            <Link
              href="/how-it-works"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/how-it-works') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/how-it-works') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              How It Works
            </Link>

            {/* Mobile Archetypes Dropdown */}
            <div>
              <button
                onClick={() => setIsArchetypesOpen(!isArchetypesOpen)}
                className={`w-full text-left px-3 py-2 rounded-md font-medium text-sm transition-colors flex items-center justify-between ${isArchetypeActive() ? 'border-l-2' : ''}`}
                style={{ color: isArchetypeActive() ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
              >
                Archetypes
                <ChevronDown className={`w-4 h-4 transition-transform ${isArchetypesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isArchetypesOpen && (
                <div className="pl-4 space-y-1">
                  <Link href="/archetypes/visionary" className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActive('/archetypes/visionary') ? 'bg-gray-50' : ''}`} style={{ color: '#666666' }}>
                    The Visionary
                  </Link>
                  <Link href="/archetypes/analyst" className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActive('/archetypes/analyst') ? 'bg-gray-50' : ''}`} style={{ color: '#666666' }}>
                    The Analyst
                  </Link>
                  <Link href="/archetypes/connector" className={`block px-3 py-2 rounded-md text-sm transition-colors ${isActive('/archetypes/connector') ? 'bg-gray-50' : ''}`} style={{ color: '#666666' }}>
                    The Connector
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/insights"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/insights') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/insights') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              Insights
            </Link>
            <Link
              href="/faq"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/faq') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/faq') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              FAQ
            </Link>
            <Link 
              href="/assessment" 
              className="block px-3 py-2 rounded-lg font-semibold transition-all mt-4 text-white"
              style={{ backgroundColor: '#4B3B8C' }}
            >
              Take Test Again
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
