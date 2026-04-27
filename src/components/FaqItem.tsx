'use client';

import { useState, useRef } from 'react';
import LucideIcon from './LucideIcon';

interface FaqItemProps {
  question: string;
  answer: string;
}

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setOpen(!open);
    if (!open && answerRef.current) {
      answerRef.current.style.maxHeight = answerRef.current.scrollHeight + 'px';
    } else if (answerRef.current) {
      answerRef.current.style.maxHeight = '0px';
    }
  };

  return (
    <div className="gp rounded-2xl overflow-hidden">
      <div
        className="p-6 md:p-7 cursor-pointer flex items-center justify-between gap-4"
        onClick={toggle}
        style={{ transition: 'background .2s', background: open ? 'var(--glh)' : undefined }}
      >
        <h4 className="text-sm md:text-base font-medium" style={{ color: 'var(--tp)' }}>{question}</h4>
        <LucideIcon
          name="Plus"
          size={16}
          className="flex-shrink-0"
          style={{ color: 'var(--tm)', transition: 'transform .3s', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}
        />
      </div>
      <div className="faq-a" ref={answerRef} style={{ maxHeight: '0px' }}>
        <div className="px-6 md:px-7 pb-6 md:pb-7">
          <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--tm)' }}>{answer}</p>
        </div>
      </div>
    </div>
  );
}