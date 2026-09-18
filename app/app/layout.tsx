import type { Metadata } from 'react';

export const metadata: Metadata = {
  title: 'EducaGam',
  description: 'Plataforma Gamificada de Aprendizagem',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
