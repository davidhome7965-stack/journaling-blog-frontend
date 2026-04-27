'use client';

import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({ target, suffix = '', className = '' }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const isDecimal = target % 1 !== 0;
          const start = performance.now();
          const duration = 2000;

          function update(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = (isDecimal ? (ease * target).toFixed(1) : Math.round(ease * target)) + suffix;
            if (progress < 1) requestAnimationFrame(update);
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}