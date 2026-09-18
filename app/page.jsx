'use client';
import { useState } from 'react';

export default function Home() {
  const [nome, setNome] = useState('');
  return (
    <main style={{ minHeight: '100vh', padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>🎮 EducaGam</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Plataforma Gamificada de Aprendizagem</p>
        <div style={{ background: 'white', color: '#333', padding: '2rem', borderRadius: '1rem' }}>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ padding: '0.75rem', width: '100%', marginBottom: '1rem', borderRadius: '0.5rem', border: '1px solid #ddd' }}
          />
          {nome && <p style={{ fontSize: '1.1rem' }}>Olá, {nome}! Vamos aprender? 🚀</p>}
        </div>
      </div>
    </main>
  );
}
