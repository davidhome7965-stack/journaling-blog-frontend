'use client';

import { useTheme } from './ThemeProvider';
import LucideIcon from './LucideIcon';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="ttg ml-1"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <LucideIcon name="Moon" size={16} />
      ) : (
        <LucideIcon name="Sun" size={16} />
      )}
    </button>
  );
}