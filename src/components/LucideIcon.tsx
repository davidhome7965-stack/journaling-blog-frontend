'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

interface LucideIconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function LucideIcon({ name, size = 20, className, style }: LucideIconProps) {
  // @ts-ignore - lucide-react exports many utilities; we only need the icon component
  const IconComponent = LucideIcons[name];
  if (!IconComponent) {
    return <span style={{ width: size, height: size, display: 'inline-block' }} />;
  }
  return <IconComponent size={size} className={className} style={style} />;
}