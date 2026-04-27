import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Journaling Techniques — The Complete Guide',
    template: '%s | Journaling Techniques',
  },
  description: 'Every method, style, and practice that actually works.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" data-theme="light" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-inter">
        <ThemeProvider>
          <div className="nl" />
          <div className="gb" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}