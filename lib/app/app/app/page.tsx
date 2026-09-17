import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-5xl font-bold text-blue-700 mb-4">🎓 EducaGam</h1>
        <p className="text-xl text-gray-600 mb-8">
          Plataforma Gamificada de Aprendizado — Da Alfabetização ao Vestibular
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/login" className="btn btn-primary text-lg">
            🔑 Entrar
          </Link>
          <Link href="/signup" className="btn btn-secondary text-lg">
            ✨ Criar Conta
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
          <div>📚 BNCC</div>
          <div>🧠 Diagnóstico Cognitivo</div>
          <div>🎮 100% Gratuito</div>
        </div>
      </div>
    </main>
  );
}
