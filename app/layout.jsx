export const metadata = {
  title: 'EducaGam',
  description: 'Plataforma Gamificada de Aprendizagem'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
