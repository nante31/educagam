'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [nome, setNome] = useState('');
  const [etapa, setEtapa] = useState('inicio');
  const [pontos, setPontos] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [estrela, setEstrela] = useState(false);
  const [diagnostico, setDiagnostico] = useState({ visual: 0, auditivo: 0, cinestesico: 0, leitura: 0 });
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [animarEntrada, setAnimarEntrada] = useState(false);
  
  // Estados da Geometria
  const [formaAtiva, setFormaAtiva] = useState('triangulo');
  const [ladoA, setLadoA] = useState(80);
  const [ladoB, setLadoB] = useState(60);
  const [angulo, setAngulo] = useState(60);
  const [mostrarDica, setMostrarDica] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setAnimarEntrada(true);
  }, []);

  // Desenhar formas geométricas
  useEffect(() => {
    if (etapa !== 'geometria') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const desenhar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Grade de fundo
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
      }

      ctx.lineWidth = 3;
      ctx.font = 'bold 16px system-ui';
      ctx.textAlign = 'center';

      if (formaAtiva === 'triangulo') {
        const pontos = [
          { x: cx, y: cy - ladoA },
          { x: cx - ladoB, y: cy + ladoB/1.5 },
          { x: cx + ladoB, y: cy + ladoB/1.5 }
        ];
        ctx.beginPath();
        ctx.moveTo(pontos[0].x, pontos[0].y);
        pontos.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.closePath();
        ctx.fillStyle = 'rgba(79, 209, 197, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#4fd1c5';
        ctx.stroke();
        
        // Rótulos
        ctx.fillStyle = '#fff';
        ctx.fillText('A', cx, pontos[0].y - 15);
        ctx.fillText('B', pontos[1].x - 15, pontos[1].y + 25);
        ctx.fillText('C', pontos[2].x + 15, pontos[2].y + 25);
        ctx.font = '14px system-ui';
        ctx.fillStyle = '#a0f0e6';
        ctx.fillText(`Soma dos ângulos = 180°`, cx, cy + ladoB/1.5 + 45);
      }

      if (formaAtiva === 'quadrado') {
        const tam = ladoA;
        ctx.beginPath();
        ctx.rect(cx - tam/2, cy - tam/2, tam, tam);
        ctx.fillStyle = 'rgba(246, 173, 85, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#f6ad55';
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = '14px system-ui';
        ctx.fillText(`Lado = ${Math.round(tam/5)} unidades`, cx, cy + tam/2 + 35);
        ctx.fillText(`Área = ${Math.round((tam/5)*(tam/5))} u²`, cx, cy + tam/2 + 55);
      }

      if (formaAtiva === 'circulo') {
        const r = ladoA / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(159, 122, 234, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#9f7aea';
        ctx.stroke();
        // Raio
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(0), cy - r * Math.sin(0));
        ctx.strokeStyle = '#d6bcfa';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#d6bcfa';
        ctx.font = '14px system-ui';
        ctx.fillText(`r = ${Math.round(r/5)}`, cx + r/2, cy - 8);
        ctx.fillText(`Diâmetro = ${Math.round(r/5)*2}`, cx, cy + r + 30);
        ctx.fillText(`Perímetro ≈ ${(2 * Math.PI * (r/5)).toFixed(1)}`, cx, cy + r + 50);
      }

      if (formaAtiva === 'retangulo') {
        const w = ladoA;
        const h = ladoB;
        ctx.beginPath();
        ctx.rect(cx - w/2, cy - h/2, w, h);
        ctx.fillStyle = 'rgba(237, 100, 166, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#ed64a6';
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = '14px system-ui';
        ctx.fillText(`${Math.round(w/5)}`, cx, cy - h/2 - 15);
        ctx.fillText(`${Math.round(h/5)}`, cx - w/2 - 25, cy);
        ctx.fillText(`Área = ${Math.round((w/5)*(h/5))} u²`, cx, cy + h/2 + 35);
      }
    };

    desenhar();
  }, [etapa, formaAtiva, ladoA, ladoB, angulo]);

  const canais = [
    { chave: 'visual', nome: '🎨 Visual', desc: 'Aprende vendo imagens, cores e gráficos' },
    { chave: 'auditivo', nome: '🎧 Auditivo', desc: 'Aprende ouvindo, explicando e debatendo' },
    { chave: 'cinestesico', nome: '✋ Cinestésico', desc: 'Aprende fazendo, tocando e movimentando' },
    { chave: 'leitura', nome: '📖 Leitura/Escrita', desc: 'Aprende lendo e escrevendo' }
  ];

  const perguntasDiagnostico = [
    { texto: 'Quando quero aprender algo novo, prefiro:', opcoes: [
      { texto: 'Ver diagramas, figuras e cores', canal: 'visual' },
      { texto: 'Ouvir explicações e debates', canal: 'auditivo' },
      { texto: 'Fazer experiências e praticar', canal: 'cinestesico' },
      { texto: 'Ler textos e fazer anotações', canal: 'leitura' }
    ]},
    { texto: 'Lembro-me melhor quando:', opcoes: [
      { texto: 'Visualizo a cena na minha mente', canal: 'visual' },
      { texto: 'Repito ou ouço a informação em voz alta', canal: 'auditivo' },
      { texto: 'Mexe nas mãos ou represento a situação', canal: 'cinestesico' },
      { texto: 'Escrevo ou leio várias vezes', canal: 'leitura' }
    ]},
    { texto: 'Nas aulas, gosto mais de:', opcoes: [
      { texto: 'Slides, desenhos e vídeos', canal: 'visual' },
      { texto: 'Aula dialogada e música', canal: 'auditivo' },
      { texto: 'Trabalhos manuais e movimento', canal: 'cinestesico' },
      { texto: 'Leitura e produção de texto', canal: 'leitura' }
    ]},
    { texto: 'Resolvo problemas com:', opcoes: [
      { texto: 'Esquemas e desenhos', canal: 'visual' },
      { texto: 'Conversando com alguém', canal: 'auditivo' },
      { texto: 'Testando e errando até acertar', canal: 'cinestesico' },
      { texto: 'Organizando por escrito', canal: 'leitura' }
    ]}
  ];

  const perguntasQuiz = [
    { materia: 'Matemática', nivel: 1, pergunta: 'Qual é o resultado de 7 × 8?', opcoes: ['54', '56', '63', '49'], correta: 1, explicacao: '7 × 8 = 56! Parabéns! 🎯' },
    { materia: 'Português', nivel: 1, pergunta: 'Assinale a frase CORRETA:', opcoes: ['Nós fomos na praia ontem.', 'Nós fomos à praia ontem.', 'Nós foi na praia ontem.', 'Nós vamos ir na praia.'], correta: 1, explicacao: 'Usa-se "à" (a + a) com verbo ir! ✅' },
    { materia: 'Ciências', nivel: 2, pergunta: 'Qual é o gás que as plantas precisam para fazer a fotossíntese?', opcoes: ['Oxigênio', 'Nitrogênio', 'Gás Carbônico', 'Hidrogênio'], correta: 2, explicacao: 'As plantas absorvem CO₂ e liberam oxigênio! 🌿🌳' },
    { materia: 'Matemática', nivel: 2, pergunta: 'Um triângulo tem quantos graus na soma dos ângulos internos?', opcoes: ['90°', '180°', '270°', '360°'], correta: 1, explicacao: 'Qualquer triângulo sempre soma 180°! 🔺' }
  ];

  const registrarResposta = (canal) => {
    setDiagnostico(prev => ({ ...prev, [canal]: prev[canal] + 1 }));
    if (perguntaAtual + 1 >= perguntasDiagnostico.length) setEtapa('resultadoDiagnostico');
    else setPerguntaAtual(prev => prev + 1);
  };

  const getCanalPredominante = () => Object.entries(diagnostico).sort((a, b) => b[1] - a[1])[0][0];

  const responderQuiz = (indice) => {
    setRespostaSelecionada(indice);
    const pergunta = perguntasQuiz[perguntaAtual];
    if (indice === pergunta.correta) {
      setEstrela(true);
      setPontos(prev => prev + 10 * nivel);
      setTimeout(() => {
        setEstrela(false);
        if (perguntaAtual + 1 >= perguntasQuiz.length) setEtapa('concluido');
        else { setPerguntaAtual(prev => prev + 1); setRespostaSelecionada(null); }
      }, 1500);
    } else setTimeout(() => setRespostaSelecionada(null), 1500);
  };

  const reiniciar = () => {
    setEtapa('inicio'); setPerguntaAtual(0); setRespostaSelecionada(null);
    setDiagnostico({ visual:0, auditivo:0, cinestesico:0, leitura:0 });
  };

  const canalPred = getCanalPredominante();
  const infoCanal = canais.find(c => c.chave === canalPred);

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif',
      transition: 'all 0.5s ease'
    }}>
      <header style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{
          fontSize: '1.8rem', fontWeight: 'bold', margin: 0,
          background: 'linear-gradient(90deg, #f093fb, #f5576a, #ffd89b)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>🎮 EducaGam</h1>
        {etapa !== 'inicio' && (
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Nível</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ffd700' }}>⭐ {nivel}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Pontos</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#7fff7f' }}>{pontos}</div>
            </div>
            {etapa !== 'inicio' && (
              <button onClick={() => setEtapa('geometria')} style={{
                padding: '0.6rem 1.2rem', borderRadius: '2rem', border: 'none',
                background: 'linear-gradient(90deg, #4fd1c5, #38b2ac)', color: 'white',
                cursor: 'pointer', fontWeight: 'bold', transition: 'transform 0.2s'
              }} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                 onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>📐 Geometria</button>
            )}
          </div>
        )}
      </header>

      <div style={{
        maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem',
        opacity: animarEntrada ? 1 : 0, transform: animarEntrada ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out'
      }}>

        {/* TELA INICIAL */}
        {etapa === 'inicio' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀✨🌟</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Bem-vindo ao futuro da aprendizagem!</h2>
            <p style={{ fontSize: '1.2rem', color: '#d0d0d0', marginBottom: '2rem' }}>
              Descubra como você aprende melhor, ganhe pontos, explore geometria e domine o conhecimento!
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.1)', borderRadius: '1.5rem', padding: '2.5rem',
              marginBottom: '2rem', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Qual é o seu nome?</label>
              <input type="text" placeholder="Digite seu nome aqui..." value={nome}
                onChange={(e) => setNome(e.target.value)} style={{
                  width: '100%', padding: '1rem 1.5rem', fontSize: '1.1rem', borderRadius: '0.8rem',
                  border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)',
                  color: 'white', outline: 'none', transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f093fb'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
            </div>
            <button onClick={() => nome.trim() && setEtapa('diagnostico')} disabled={!nome.trim()} style={{
              padding: '1rem 3rem', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '3rem', border: 'none',
              background: nome.trim() ? 'linear-gradient(90deg, #f093fb, #f5576a)' : '#444',
              color: 'white', cursor: nome.trim() ? 'pointer' : 'not-allowed',
              boxShadow: nome.trim() ? '0 4px 20px rgba(240,147,251,0.4)' : 'none', transition: 'all 0.3s ease'
            }}
              onMouseOver={(e) => nome.trim() && (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => nome.trim() && (e.target.style.transform = 'scale(1)')}
            >
              Começar Minha Jornada → 🌟
            </button>
          </div>
        )}

        {/* DIAGNÓSTICO */}
        {etapa === 'diagnostico' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              {perguntasDiagnostico.map((_, i) => (
                <div key={i} style={{
                  width: i === perguntaAtual ? '2rem' : '0.8rem', height: '0.8rem', borderRadius: '0.4rem',
                  background: i < perguntaAtual ? '#7fff7f' : i === perguntaAtual ? '#f093fb' : '#444',
                  transition: 'all 0.3s ease'
                }} />
              ))}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Olá, {nome}! Vamos te conhecer 🧠</h3>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Pergunta {perguntaAtual + 1} de {perguntasDiagnostico.length}</p>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>{perguntasDiagnostico[perguntaAtual].texto}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {perguntasDiagnostico[perguntaAtual].opcoes.map((op, i) => (
                <button key={i} onClick={() => registrarResposta(op.canal)} style={{
                  padding: '1.2rem 1.5rem', fontSize: '1rem', borderRadius: '0.8rem',
                  border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
                  color: 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease'
                }}
                  onMouseOver={(e) => { e.target.style.background = 'rgba(240,147,251,0.2)'; e.target.style.borderColor = '#f093fb'; e.target.style.transform = 'translateX(8px)'; }}
                  onMouseOut={(e) => { e.target.style.background = 'rgba(255,255,255,0.08)'; e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.transform = 'translateX(0)'; }}
                >
                  {op.texto}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTADO DIAGNÓSTICO */}
        {etapa === 'resultadoDiagnostico' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨🎉✨</div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Descobrimos algo incrível, {nome}!</h3>
            <div style={{
              background: 'linear-gradient(135deg, rgba(240,147,251,0.2), rgba(85,108,255,0.2))',
              borderRadius: '1.5rem', padding: '2rem', marginBottom: '2rem',
              border: '2px solid rgba(240,147,251,0.3)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{infoCanal?.nome}</div>
              <p style={{ fontSize: '1.1rem', color: '#ddd' }}>{infoCanal?.desc}</p>
            </div>
            <p style={{ marginBottom: '2rem', color: '#aaa' }}>Adaptaremos todo o aprendizado para o seu estilo! 🎯</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setEtapa('quiz'); setPerguntaAtual(0); }} style={{
                padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '3rem', border: 'none',
                background: 'linear-gradient(90deg, #7fff7f, #00c9ff)', color: '#000', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(127,255,127,0.3)', transition: 'all 0.3s ease'
              }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                📚 Iniciar Quiz
              </button>
              <button onClick={() => setEtapa('geometria')} style={{
                padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '3rem', border: 'none',
                background: 'linear-gradient(90deg, #4fd1c5, #319795)', color: 'white', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(79,209,197,0.3)', transition: 'all 0.3s ease'
              }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                📐 Explorar Geometria
              </button>
            </div>
          </div>
        )}

        {/* GEOMETRIA INTERATIVA — NOVO! */}
        {etapa === 'geometria' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📐 Geometria Dinâmica</h2>
              <p style={{ color: '#aaa' }}>Arraste os controles e veja as formas mudarem em tempo real! 👀✨</p>
            </div>

            {/* Seletor de Formas */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {[
                { id: 'triangulo', nome: '🔺 Triângulo' },
                { id: 'quadrado', nome: '⬜ Quadrado' },
                { id: 'retangulo', nome: '▬ Retângulo' },
                { id: 'circulo', nome: '⭕ Círculo' }
              ].map(f => (
                <button key={f.id} onClick={() => setFormaAtiva(f.id)} style={{
                  padding: '0.75rem 1.25rem', borderRadius: '0.8rem', border: 'none',
                  background: formaAtiva === f.id ? 'linear-gradient(90deg, #4fd1c5, #9f7aea)' : 'rgba(255,255,255,0.08)',
                  color: 'white', cursor: 'pointer', fontWeight: formaAtiva === f.id ? 'bold' : 'normal',
                  transform: formaAtiva === f.id ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.25s ease'
                }}>{f.nome}</button>
              ))}
            </div>

            {/* Área de Desenho */}
            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', padding: '1.5rem',
              marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <canvas ref={canvasRef} width={600} height={400} style={{
                width: '100%', height: 'auto', borderRadius: '0.8rem', background: 'rgba(0,0,0,0.25)'
              }} />
            </div>

            {/* Controles Deslizantes */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  {formaAtiva === 'circulo' ? '📏 Raio' : '📏 Dimensão Principal'}: {ladoA}
                </label>
                <input type="range" min="30" max="180" value={ladoA}
                  onChange={(e) => setLadoA(Number(e.target.value))} style={{ width: '100%', accentColor: '#4fd1c5' }} />
              </div>
              {(formaAtiva === 'retangulo' || formaAtiva === 'triangulo') && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    📏 Dimensão Secundária: {ladoB}
                  </label>
                  <input type="range" min="30" max="180" value={ladoB}
                    onChange={(e) => setLadoB(Number(e.target.value))} style={{ width: '100%', accentColor: '#ed64a6' }} />
                </div>
              )}
            </div>

            {/* Explicação Educativa */}
            <div style={{
              background: 'rgba(79,209,197,0.1)', borderRadius: '1rem', padding: '1.5rem',
              border: '1px solid rgba(79,209,197,0.25)', marginBottom: '2rem'
            }}>
              <button onClick={() => setMostrarDica(!mostrarDica)} style={{
                background: 'none', border: 'none', color: '#4fd1c5', fontSize: '1rem',
                cursor: 'pointer', fontWeight: 'bold', width: '100%', textAlign: 'left'
              }}>
                💡 {mostrarDica ? 'Ocultar explicação' : 'Ver conceito matemático'} ▼
              </button>
              {mostrarDica && (
                <div style={{ marginTop: '1rem', color: '#d0d0d0', lineHeight: '1.8' }}>
                  {formaAtiva === 'triangulo' && (
                    <>
                      <p><strong>🔺 Triângulo</strong></p>
                      <p>• Soma dos ângulos internos = <strong>180°</strong></p>
                      <p>• Área = (base × altura) ÷ 2</p>
                      <p>• Três lados, três vértices, três ângulos</p>
                    </>
                  )}
                  {formaAtiva === 'quadrado' && (
                    <>
                      <p><strong>⬜ Quadrado</strong></p>
                      <p>• Todos os lados têm o mesmo comprimento</p>
                      <p>• Todos os ângulos = 90°</p>
                      <p>• Área = lado × lado = lado²</p>
                      <p>• Perímetro = 4 × lado</p>
                    </>
                  )}
                  {formaAtiva === 'retangulo' && (
                    <>
                      <p><strong>▬ Retângulo</strong></p>
                      <p>• Lados opostos têm o mesmo comprimento</p>
                      <p>• Todos os ângulos = 90°</p>
                      <p>• Área = comprimento × largura</p>
                      <p>• Perímetro = 2 × (comprimento + largura)</p>
                    </>
                  )}
                  {formaAtiva === 'circulo' && (
                    <>
                      <p><strong>⭕ Círculo</strong></p>
                      <p>• Diâmetro = 2 × raio</p>
                      <p>• Perímetro = 2 × π × r ≈ 6,28 × r</p>
                      <p>• Área = π × r² ≈ 3,14 × r²</p>
                      <p>• π ≈ 3,14159 — constante matemática</p>
                    </>
                  )}
                  <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#a0f0e6' }}>
                    🌟 Experimente mudar os valores e veja como os cálculos se alteram!
                  </p>
                </div>
              )}
            </div>

            {/* Navegação */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => setEtapa('quiz')} style={{
                padding: '0.85rem 1.5rem', borderRadius: '2rem', border: 'none',
                background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', transition: 'all 0.2s'
              }} onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}>
                📚 Ir para o Quiz
              </button>
              <button onClick={() => setEtapa('inicio')} style={{
                padding: '0.85rem 1.5rem', borderRadius: '2rem', border: 'none',
                background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', transition: 'all 0.2s'
              }} onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}>
                🏠 Página Inicial
              </button>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {etapa === 'quiz' && (
          <div style={{ textAlign: 'center' }}>
            {estrela && (
              <div style={{
                position: 'fixed', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', fontSize: '4rem', zIndex: 200,
                animation: 'pulse 0.5s ease-in-out'
              }}>⭐ +{10 * nivel} pontos!</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
                📚 {perguntasQuiz[perguntaAtual].materia}
              </span>
              <span style={{ color: '#aaa' }}>{perguntaAtual + 1} / {perguntasQuiz.length}</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginBottom: '2rem' }}>
              <div style={{
                width: `${((perguntaAtual + 1) / perguntasQuiz.length) * 100}%`, height: '100%',
                background: 'linear-gradient(90deg, #7fff7f, #00c9ff)', borderRadius: '3px', transition: 'width 0.5s ease'
              }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>
              {perguntasQuiz[perguntaAtual].pergunta}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {perguntasQuiz[perguntaAtual].opcoes.map((op, i) => {
                let estilo = {
                  padding: '1.2rem', fontSize: '1rem', borderRadius: '0.8rem',
                  border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
                  color: 'white', cursor: respostaSelecionada === null ? 'pointer' : 'default', transition: 'all 0.3s ease'
                };
                if (respostaSelecionada !== null) {
                  if (i === perguntasQuiz[perguntaAtual].correta) {
                    estilo = { ...estilo, borderColor: '#7fff7f', background: 'rgba(127,255,127,0.2)' };
                  } else if (i === respostaSelecionada) {
                    estilo = { ...estilo, borderColor: '#ff4444', background: 'rgba(255,68,68,0.2)', opacity: 0.7 };
                  } else {
                    estilo = { ...estilo, opacity: 0.4 };
                  }
                }
                return (
                  <button key={i} onClick={() => respostaSelecionada === null && responderQuiz(i)} style={estilo}
                    onMouseOver={(e) => {
                      if (respostaSelecionada === null) {
                        e.target.style.background = 'rgba(240,147,251,0.2)';
                        e.target.style.borderColor = '#f093fb';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (respostaSelecionada === null) {
                        e.target.style.background = 'rgba(255,255,255,0.08)';
                        e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                      }
                    }}
                  >{op}</button>
                );
              })}
            </div>
            {respostaSelecionada !== null && (
              <p style={{ marginTop: '1.5rem', color: respostaSelecionada === perguntasQuiz[perguntaAtual].correta ? '#7fff7f' : '#ff8888' }}>
                {respostaSelecionada === perguntasQuiz[perguntaAtual].correta
                  ? perguntasQuiz[perguntaAtual].explicacao
                  : 'Não foi dessa vez! Tente novamente na próxima 📚'}
              </p>
            )}
            <div style={{ marginTop: '2rem' }}>
              <button onClick={() => setEtapa('geometria')} style={{
                padding: '0.75rem 1.5rem', borderRadius: '2rem', border: 'none',
                background: 'rgba(79,209,197,0.2)', color: '#4fd1c5', cursor: 'pointer', transition: 'all 0.2s'
              }} onMouseOver={(e) => e.target.style.background = 'rgba(79,209,197,0.3)'}}>
                📐 Explorar Geometria
              </button>
            </div>
          </div>
        )}

        {/* CONCLUSÃO */}
        {etapa === 'concluido' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆🎉🌟</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Missão Cumprida, {nome}! 🚀</h2>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.1))',
              borderRadius: '1.5rem', padding: '2.5rem', marginBottom: '2rem',
              border: '2px solid rgba(255,215,0,0.3)'
            }}>
              <p style={{ fontSize: '1.3rem' }}>Você conquistou</p>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffd700', margin: '1rem 0' }}>{pontos} Pontos ⭐</p>
              <p style={{ fontSize: '1.1rem', color: '#aaa' }}>Canal de aprendizagem: {infoCanal?.nome}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { reiniciar(); setPontos(0); setNivel(1); }} style={{
                padding: '1rem 2rem', fontSize: '1rem', borderRadius: '2rem', border: 'none',
                background: 'rgba(255,255,255,0.15)', color: 'white', cursor: 'pointer', transition: 'all 0.3s ease'
              }} onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}}>
                🔄 Recomeçar
              </button>
              <button onClick={() => { reiniciar(); setNivel(prev => prev + 1); }} style={{
                padding: '1rem 2rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '2rem', border: 'none',
                background: 'linear-gradient(90deg, #ffd700, #ff8c00)', color: '#000', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(255,215,0,0.3)', transition: 'all 0.3s ease'
              }} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                 onMouseOut={(e) => e.target.style.transform = 'scale(1)'}}>
                Subir de Nível ⬆️
              </button>
              <button onClick={() => setEtapa('geometria')} style={{
                padding: '1rem 2rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '2rem', border: 'none',
                background: 'linear-gradient(90deg, #4fd1c5, #319795)', color: 'white', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(79,209,197,0.3)', transition: 'all 0.3s ease'
              }} onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                 onMouseOut={(e) => e.target.style.transform = 'scale(1)'}}>
                📐 Explorar Geometria
              </button>
            </div>
          </div>
        )}
      </div>

      <footer style={{ textAlign: 'center', padding: '2rem', color: '#666', fontSize: '0.9rem', marginTop: '3rem' }}>
        <p>🎮 EducaGam — Aprender é a maior aventura do mundo 🌍</p>
        <p>Inspirado no melhor do Matific, GeoGebra e Kahoot — reinventado para você! ✨</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.3); }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
