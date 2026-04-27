'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: string;
  className?: string;
}

export default function RevealOnScroll({ children, delay, className = '' }: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately make visible if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('v');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('v');
          observer.unobserve(el);
        }
      },
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`rv ${delay || ''} ${className}`}>
      {children}
    </div>
  );
}