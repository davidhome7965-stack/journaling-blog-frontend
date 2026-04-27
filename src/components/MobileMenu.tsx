'use client';

import { useState } from 'react';
import Link from 'next/link';
import LucideIcon from './LucideIcon';

interface MobileMenuProps {
  links?: { href: string; label: string; active?: boolean }[];
}

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuLinks = links || [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/#types', label: 'Techniques' },
    { href: '/#guide', label: 'Guide' },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="md:hidden px-2.5 py-2 rounded-lg nvl"
        aria-label="Menu"
      >
        <LucideIcon name="Menu" size={18} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 md:hidden"
          style={{ background: 'var(--bgm)', backdropFilter: 'blur(20px)' }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 nvl p-2"
            aria-label="Close menu"
          >
            <LucideIcon name="X" size={22} />
          </button>
          {menuLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-light"
              style={{ color: 'var(--ts)' }}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}