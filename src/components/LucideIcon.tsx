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
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>>)[name];

  if (!IconComponent) {
    return <span style={{ width: size, height: size, display: 'inline-block' }} />;
  }

  return <IconComponent size={size} className={className} style={style} />;
}