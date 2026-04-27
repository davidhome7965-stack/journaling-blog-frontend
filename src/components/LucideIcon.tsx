// @ts-nocheck
'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';

export default function LucideIcon({ name, size = 20, className, style }) {
  const IconComponent = LucideIcons[name];
  if (!IconComponent) {
    return <span style={{ width: size, height: size, display: 'inline-block' }} />;
  }
  return <IconComponent size={size} className={className} style={style} />;
}