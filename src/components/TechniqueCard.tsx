// @ts-nocheck
'use client';

import { useRef, useState } from 'react';
import LucideIcon from './LucideIcon';
import { getTechniqueCategory, categoryColors } from '@/lib/techniques';
import { TechniqueData } from '@/types';

interface TechniqueCardProps {
  technique: TechniqueData;
}

export default function TechniqueCard({ technique }: TechniqueCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cat = getTechniqueCategory(technique.id);
  const colors = categoryColors[cat];

  const toggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (bodyRef.current) {
      bodyRef.current.style.maxHeight = next ? bodyRef.current.scrollHeight + 'px' : '0px';
    }
  };

  const topTags = technique.tags.slice(0, 3);

  return (
    <div className={`tc ${isOpen ? 'op' : ''}`}>
      <div className="ta" style={{ background: `linear-gradient(to right, ${colors.accent}, transparent)` }} />
      <div className="tb" onClick={toggle}>
        <div className="tn">TECHNIQUE {String(technique.id).padStart(2, '0')}</div>
        <h3 className="tt">{technique.name}</h3>
        <p className="tds">{technique.description}</p>
        <div className="tbf">
          {topTags.map(tag => <span key={tag} className="tg">{tag}</span>)}
        </div>
        <div className="tarr">
          <LucideIcon name="ChevronDown" size={16} />
        </div>
      </div>
      <div className="txd" />
      <div className="tx" ref={bodyRef} style={{ maxHeight: '0px' }}>
        <div className="txi">
          <p className="txp">{technique.details}</p>
          {technique.image && (
            <div className="tximg">
              <img src={technique.image} alt={technique.name} loading="lazy" />
            </div>
          )}
          <div className="txaf">
            {technique.tags.map(tag => <span key={tag} className="tg">{tag}</span>)}
          </div>
          {technique.prompts.length > 0 && (
            <div className="txpr">
              <div className="txprt">{technique.prompts.length === 1 && technique.prompts[0].length > 50 ? 'Important Note' : 'Sample Prompts'}</div>
              {technique.prompts.map((p, i) => (
                <p key={i} className="txprp">{p}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}