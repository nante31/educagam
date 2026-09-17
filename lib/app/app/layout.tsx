import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EducaGam — Plataforma Educacional Gamificada',
  description: 'Aprenda de forma divertida! Da alfabetização aos vestibulares.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
