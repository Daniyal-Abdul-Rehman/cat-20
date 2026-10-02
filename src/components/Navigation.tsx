'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { LogIn, UserPlus, User, LogOut } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="bg-[#FAF6EF] relative z-50 sticky top-0">
      <div className="max-w-9xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex flex-col">
              <span className="text-4xl font-bold" style={{ color: '#1a1a1a' }}>CAT-<span className=" font-bold" style={{ color: '#4B3B8C' }}>20</span></span>
              <span className="text-xs" style={{ color: '#666666', letterSpacing: '0.05em' }}>COGNITIVE ARCHETYPE TAXONOMY</span>
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
              href="/archetypes"
              className={`font-medium text-sm px-4 py-2 transition-colors ${isActive('/archetypes') || pathname.startsWith('/archetypes/') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/archetypes') || pathname.startsWith('/archetypes/') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              Archetypes
            </Link>
            <Link
              href="/faq"
              className={`font-medium text-sm px-4 py-2 transition-colors ${isActive('/faq') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/faq') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              FAQ
            </Link>
          </div>

          {/* Auth Buttons - Right */}
          <div className="hidden lg:flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/account" 
                  className="px-6 py-3 font-medium rounded-lg hover:scale-105 transition transform flex items-center gap-2"
                  style={{ color: '#4B3B8C', border: '2px solid #4B3B8C' }}
                >
                  <User className="w-4 h-4" />
                  My Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 font-semibold rounded-lg hover:scale-105 transition transform text-white flex items-center gap-2"
                  style={{ backgroundColor: '#4B3B8C' }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/auth/signup" 
                  className="px-6 py-3 font-medium rounded-lg hover:scale-105 transition transform flex items-center gap-2"
                  style={{ color: '#4B3B8C', border: '2px solid #4B3B8C' }}
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
                <Link 
                  href="/auth/signin" 
                  className="px-6 py-3 font-semibold rounded-lg hover:scale-105 transition transform text-white flex items-center gap-2"
                  style={{ backgroundColor: '#4B3B8C' }}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              </div>
            )}
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
              href="/archetypes"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/archetypes') || pathname.startsWith('/archetypes/') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/archetypes') || pathname.startsWith('/archetypes/') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              Archetypes
            </Link>
            <Link
              href="/faq"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/faq') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/faq') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747' }}
            >
              FAQ
            </Link>
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="px-3 py-2 text-sm font-medium" style={{ color: '#666666' }}>
                    Signed in as {user?.name || 'User'}
                  </div>
                  <Link 
                    href="/account" 
                    className="block px-3 py-2 rounded-md font-medium transition-colors"
                    style={{ color: '#4B3B8C' }}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-lg font-semibold transition-all mt-2 text-white flex items-center gap-2"
                    style={{ backgroundColor: '#4B3B8C' }}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                <Link 
                  href="/auth/signup" 
                  className="block px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                  style={{ color: '#4B3B8C', border: '2px solid #4B3B8C' }}
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
                <Link 
                  href="/auth/signin" 
                  className="block px-3 py-2 rounded-lg font-semibold transition-all text-white flex items-center gap-2"
                  style={{ backgroundColor: '#4B3B8C' }}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
