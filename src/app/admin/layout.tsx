import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative z-10 min-h-screen px-6 py-10" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </main>
  );
}