// src/components/Navbar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LucideIcon from './LucideIcon';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#benefits', label: 'Benefits' },
    { href: '/#types', label: 'Techniques' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About Us' },      // यह पेज अभी नहीं है, बाद में बनाएँगे
    { href: '/contact', label: 'Contact Us' },  // यह पेज अभी नहीं है
  ];

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 nb rounded-full px-2 py-1.5 flex items-center gap-1"
      style={{
        background: scrolled ? 'var(--bgns)' : 'var(--bgn)',
        border: '1px solid var(--bn)',
        boxShadow: 'var(--sn)',
      }}
    >
      <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-full">
        <div className="w-5 h-5 rounded-full iv flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--cv)' }} />
        </div>
        <span className="text-sm font-medium hidden sm:inline" style={{ color: 'var(--tp)' }}>
          Journaling
        </span>
      </Link>

      <div className="hidden lg:flex items-center gap-0.5">
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="nvl px-3 py-2 text-xs font-medium rounded-full"
          >
            {link.label}
          </a>
        ))}
      </div>

      <ThemeToggle />
      <MobileMenu links={navLinks} />
    </nav>
  );
}