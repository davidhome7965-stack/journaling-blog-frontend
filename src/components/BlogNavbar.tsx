'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import LucideIcon from './LucideIcon';
import MobileMenu from './MobileMenu';

export default function BlogNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog', active: true },
    { href: '/#types', label: 'Techniques' },
    { href: '/#guide', label: 'Guide' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--bgm)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--bc)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full iv flex items-center justify-center">
            <div className="w-2 h-2 rounded-full" style={{ background: 'var(--cv)' }} />
          </div>
          <span className="text-sm font-semibold hidden sm:inline" style={{ color: 'var(--tp)' }}>
            Journaling Techniques
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ color: link.active ? 'var(--tl)' : 'var(--tm)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <MobileMenu links={navLinks} />
        </div>
      </div>
    </nav>
  );
}