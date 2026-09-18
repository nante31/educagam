import type { Metadata } from 'react'

export const metadata: Metadata = {
  title: 'EducaGam - Plataforma Gamificada',
  description: 'Aprender ficou mais divertido!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
