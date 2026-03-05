'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/episodes', label: 'Episodes' },
    { href: '/series', label: 'Series' },
    { href: '/guests', label: 'Guests' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-dark-950/80 border-b border-dark-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-podcast-500 to-podcast-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM7 12a5 5 0 0 0 10 0h-2a3 3 0 0 1-6 0H7zm4 7.93A7.001 7.001 0 0 1 5 13H3a9.001 9.001 0 0 0 8 8.93V24h2v-2.07A9.001 9.001 0 0 0 21 13h-2a7.001 7.001 0 0 1-6 6.93v.07h-2v-.07z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              My Podcast
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800/60 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-dark-400 hover:text-white hover:bg-dark-800/60 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-dark-800/50 pt-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800/60 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}