'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useNotificationStore } from '@/store/notificationStore';

export default function AccountHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="bg-[#FAF6EF] relative z-50 sticky top-0">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Left */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-bold" style={{ color: '#1a1a1a', fontFamily: 'var(--font-playfair), serif' }}>CAT-<span className=" font-bold text-[40px] sm:text-[50px]" style={{ color: '#4B3B8C', fontFamily: 'var(--font-playfair), serif' }}>20</span></span>
              <span className="text-[10px] sm:text-xs hidden sm:block" style={{ color: '#666666', letterSpacing: '0.05em', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>COGNITIVE ARCHETYPE TAXONOMY</span>
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/account"
              className={`font-medium text-sm px-3 sm:px-4 py-2 transition-colors ${isActive('/account') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/account') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Account
            </Link>
            <Link
              href="/profile"
              className={`font-medium text-sm px-3 sm:px-4 py-2 transition-colors ${isActive('/profile') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/profile') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Profile
            </Link>
            <Link
              href="/compare"
              className={`font-medium text-sm px-3 sm:px-4 py-2 transition-colors ${isActive('/compare') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/compare') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Compare Patterns
            </Link>
            <Link
              href="/history"
              className={`font-medium text-sm px-3 sm:px-4 py-2 transition-colors ${isActive('/history') ? 'border-b-2' : ''}`}
              style={{ color: isActive('/history') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Test History
            </Link>
          </div>

          {/* Take Test Again Button - Right */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-white" style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-playfair), serif' }}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span
                className="text-sm font-medium hidden sm:block"
                style={{
                  color: '#1a1a1a',
                  fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
              >
                {user?.name || 'User'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-lg hover:scale-105 transition transform text-white text-sm sm:text-base"
              style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
        <div className="md:hidden bg-[#FAF6EF] border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-white" style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-playfair), serif' }}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="text-sm font-medium" style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
                {user?.name || 'User'}
              </div>
            </div>
            <Link
              href="/account"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/account') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/account') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Account
            </Link>
            <Link
              href="/profile"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/profile') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/profile') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Profile
            </Link>
            <Link
              href="/compare"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/compare') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/compare') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Compare Patterns
            </Link>
            <Link
              href="/history"
              className={`block px-3 py-2 rounded-md font-medium text-sm transition-colors ${isActive('/history') ? 'border-l-2' : ''}`}
              style={{ color: isActive('/history') ? '#C4A747' : '#1a1a1a', borderColor: '#C4A747', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Test History
            </Link>
            <Link 
              href="/assessment" 
              className="block px-3 py-2 rounded-md font-medium text-sm transition-colors"
              style={{ color: '#1a1a1a', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Take Test Again
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-3 py-2 rounded-lg font-semibold transition-all mt-4 text-white"
              style={{ backgroundColor: '#4B3B8C', fontFamily: 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}