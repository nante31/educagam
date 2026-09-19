'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [nome, setNome] = useState('');
  const [etapa, setEtapa] = useState('inicio');
  const [nivelEnsino, setNivelEnsino] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [fase, setFase] = useState(1);
  const [estrela, setEstrela] = useState(false);
  const [diagnostico, setDiagnostico] = useState({ visual: 0, auditivo: 0, cinestesico: 0, leitura: 0 });
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [animarEntrada, setAnimarEntrada] = useState(false);
  
  // Geometria
  const [formaAtiva, setFormaAtiva] = useState('triangulo');
  const [ladoA, setLadoA] = useState(80);
  const [ladoB, setLadoB] = useState(60);
  const [mostrarDica, setMostrarDica] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    setAnimarEntrada(true);
  }, []);

  // Desenho da Geometria
  useEffect(() => {
    if (etapa !== 'geometria') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const desenhar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Grade
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
        const pts = [
          { x: cx, y: cy - ladoA },
          { x: cx - ladoB, y: cy + ladoB/1.5 },
          { x: cx + ladoB, y: cy + ladoB/1.5 }
        ];
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
        ctx.closePath();
        ctx.fillStyle = 'rgba(79, 209, 197, 0.3)'; ctx.fill();
        ctx.strokeStyle = '#4fd1c5'; ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.fillText('A', cx, pts[0].y - 15);
        ctx.fillText('B', pts[1].x - 15, pts[1].y + 25);
        ctx.fillText('C', pts[2].x + 15, pts[2].y + 25);
        ctx.font = '14px system-ui';
        ctx.fillStyle = '#a0f0e6';
        ctx.fillText('Soma dos ângulos = 180°', cx, cy + ladoB/1.5 + 45);
      }

      if (formaAtiva === 'quadrado') {
        const tam = ladoA;
        ctx.beginPath();
        ctx.rect(cx - tam/2, cy - tam/2, tam, tam);
        ctx.fillStyle = 'rgba(246, 173, 85, 0.3)'; ctx.fill();
        ctx.strokeStyle = '#f6ad55'; ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = '14px system-ui';
        ctx.fillText(`Lado = ${Math.round(tam/5)}`, cx, cy - tam/2 - 15);
        ctx.fillText(`Área = ${Math.round((tam/5)**2)} u²`, cx, cy + tam/2 + 35);
      }

      if (formaAtiva === 'circulo') {
        const r = ladoA / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(159, 122, 234, 0.3)'; ctx.fill();
        ctx.strokeStyle = '#9f7aea'; ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy); ctx.lineTo(cx + r, cy);
        ctx.strokeStyle = '#d6bcfa'; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = '#d6bcfa';
        ctx.font = '14px system-ui';
        ctx.fillText(`r = ${Math.round(r/5)}`, cx + r/2, cy - 8);
        ctx.fillText(`Perímetro ≈ ${(2*Math.PI*(r/5)).toFixed(1)}`, cx, cy + r + 35);
      }

      if (formaAtiva === 'retangulo') {
        const w = ladoA, h = ladoB;
        ctx.beginPath();
        ctx.rect(cx - w/2, cy - h/2, w, h);
        ctx.fillStyle = 'rgba(237, 100, 166, 0.3)'; ctx.fill();
        ctx.strokeStyle = '#ed64a6'; ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = '14px system-ui';
        ctx.fillText(`${Math.round(w/5)}`, cx, cy - h/2 - 15);
        ctx.fillText(`${Math.round(h/5)}`, cx - w/2 - 25, cy);
        ctx.fillText(`Área = ${Math.round((w/5)*(h/5))} u²`, cx, cy + h/2 + 35);
      }
    };
    desenhar();
  }, [etapa, formaAtiva, ladoA, ladoB]);

  // Definições de Níveis
  const niveisEnsino = [
    {
      id: 'alfabetizacao',
      nome: '🔤 Alfabetização',
      desc: 'Letras, números, cores e formas — primeiros passos!',
      faixa: '4 a 7 anos',
      cor: '#f687b3'
    },
    {
      id: 'fundamental1',
      nome: '📗 Fundamental I',
      desc: 'Leitura, contas, ciências e o mundo ao redor',
      faixa: '6 a 10 anos',
      cor: '#68d391'
    },
    {
      id: 'fundamental2',
      nome: '📘 Fundamental II',
      desc: 'Matemática, línguas, história, geografia e ciências',
      faixa: '10 a 15 anos',
      cor: '#63b3ed'
    },
    {
      id: 'medio',
      nome: '📕 Ensino Médio',
      desc: 'Física, química, biologia, literatura e preparação',
      faixa: '15 a 18 anos',
      cor: '#b794f4'
    }
  ];

  const canais = [
    { chave: 'visual', nome: '🎨 Visual', desc: 'Aprende vendo imagens, cores e gráficos' },
    { chave: 'auditivo', nome: '🎧 Auditivo', desc: 'Aprende ouvindo, explicando e debatendo' },
    { chave: 'cinestesico', nome: '✋ Cinestésico', desc: 'Aprende fazendo, tocando e movimentando' },
    { chave: 'leitura', nome: '📖 Leitura/Escrita', desc: 'Aprende lendo e escrevendo' }
  ];

  const perguntasDiagnostico = [
    { texto: 'Quando quero aprender algo novo, prefiro:', opcoes: [
      { texto: 'Ver desenhos, figuras e cores', canal: 'visual' },
      { texto: 'Ouvir explicações e histórias', canal: 'auditivo' },
      { texto: 'Fazer e praticar com as mãos', canal: 'cinestesico' },
      { texto: 'Ler e escrever sobre o assunto', canal: 'leitura' }
    ]},
    { texto: 'Lembro-me melhor quando:', opcoes: [
      { texto: 'Vejo a cena na minha mente', canal: 'visual' },
      { texto: 'Ouço ou repito em voz alta', canal: 'auditivo' },
      { texto: 'Movo-me ou represento a situação', canal: 'cinestesico' },
      { texto: 'Anoto e releio várias vezes', canal: 'leitura' }
    ]},
    { texto: 'Nas atividades, gosto mais de:', opcoes: [
      { texto: 'Desenhos, vídeos e imagens', canal: 'visual' },
      { texto: 'Músicas, conversas e áudios', canal: 'auditivo' },
      { texto: 'Brincar, construir e experimentar', canal: 'cinestesico' },
      { texto: 'Livros, cadernos e textos', canal: 'leitura' }
    ]}
  ];

  // Perguntas por Nível — Alinhadas à BNCC
  const perguntasPorNivel = {
    alfabetizacao: [
      { materia: '📝 Português', pergunta: 'Qual destas é uma vogal?', opcoes: ['B', 'A', 'D', 'F'], correta: 1, explicacao: '"A" é a primeira vogal! 🎉' },
      { materia: '🔢 Matemática', pergunta: 'Quantos dedos tenho em UMA mão?', opcoes: ['4', '5', '6', '10'], correta: 1, explicacao: 'Temos 5 dedos em cada mão! ✋' },
      { materia: '🌈 Geral', pergunta: 'Qual é a cor do SOL?', opcoes: ['Azul', 'Verde', 'Amarelo', 'Roxo'], correta: 2, explicacao: 'O sol é amarelo e brilhante! ☀️' },
      { materia: '🔤 Letras', pergunta: 'Com qual letra começa a palavra "GATO"?', opcoes: ['T', 'G', 'A', 'O'], correta: 1, explicacao: 'G-A-T-O → começa com G! 🐱' }
    ],
    fundamental1: [
      { materia: '🔢 Matemática', pergunta: 'Quanto é 25 + 17?', opcoes: ['32', '41', '42', '52'], correta: 2, explicacao: '25 + 17 = 42 ✅' },
      { materia: '📖 Português', pergunta: 'Qual é o antônimo de "ALTO"?', opcoes: ['Grande', 'Baixo', 'Largo', 'Pesado'], correta: 1, explicacao: 'Alto ↔ Baixo — são opostos! 📏' },
      { materia: '🌿 Ciências', pergunta: 'De onde as plantas tiram energia?', opcoes: ['Da Lua', 'Do Sol', 'Dos insetos', 'Do vento'], correta: 1, explicacao: 'As plantas precisam do Sol para crescer! 🌿☀️' },
      { materia: '🌍 Geografia', pergunta: 'Onde fica o Brasil?', opcoes: ['Europa', 'América do Sul', 'Ásia', 'África'], correta: 1, explicacao: 'Brasil é o maior país da América do Sul! 🇧🇷' }
    ],
    fundamental2: [
      { materia: '📐 Matemática', pergunta: 'Quanto é 7 × 9?', opcoes: ['56', '63', '72', '81'], correta: 1, explicacao: '7 × 9 = 63! Tabuada em dia! 🎯' },
      { materia: '📝 Português', pergunta: 'Assinale a frase CORRETA:', opcoes: ['Nós fomos na praia.', 'Nós fomos à praia.', 'Nós foi na praia.', 'Nós ir à praia.'], correta: 1, explicacao: 'Usa-se "à" (a + a) com o verbo ir! ✅' },
      { materia: '⚗️ Ciências', pergunta: 'Qual gás as plantas liberam?', opcoes: ['CO₂', 'Oxigênio', 'Nitrogênio', 'Hidrogênio'], correta: 1, explicacao: 'Plantas absorvem CO₂ e liberam Oxigênio! 🌳' },
      { materia: '📜 História', pergunta: 'Em que ano o Brasil foi descoberto?', opcoes: ['1492', '1500', '1522', '1600'], correta: 1, explicacao: '22 de abril de 1500! 🇧🇷' },
      { materia: '📐 Geometria', pergunta: 'Soma dos ângulos de um triângulo?', opcoes: ['90°', '180°', '270°', '360°'], correta: 1, explicacao: 'Sempre 180°, não importa o tamanho! 🔺' }
    ],
    medio: [
      { materia: '📐 Matemática', pergunta: 'Qual é a raiz quadrada de 144?', opcoes: ['10', '11', '12', '14'], correta: 2, explicacao: '12 × 12 = 144 → √144 = 12 ✅' },
      { materia: '⚛️ Física', pergunta: 'Aceleração da gravidade na Terra é aproximadamente:', opcoes: ['5 m/s²', '9,8 m/s²', '15 m/s²', '20 m/s²'], correta: 1, explicacao: 'g ≈ 9,8 m/s² — força que nos mantém no chão! 🌍' },
      { materia: '🧪 Química', pergunta: 'A água é composta por:', opcoes: ['H₂O', 'CO₂', 'O₂', 'NaCl'], correta: 0, explicacao: 'Hidrogênio + Oxigênio = Água! 💧' },
      { materia: '📚 Literatura', pergunta: 'Quem escreveu "Os Lusíadas"?', opcoes: ['Machado de Assis', 'Camoes', 'Fernando Pessoa', 'José de Alencar'], correta: 1, explicacao: 'Luís de Camões — maior poema épico de Portugal! 📖' },
      { materia: '🧬 Biologia', pergunta: 'Onde fica o DNA da célula eucariótica?', opcoes: ['Citoplasma', 'Núcleo', 'Membrana', 'Ribossomo'], correta: 1, explicacao: 'O núcleo protege o material genético! 🧬' },
      { materia: '📐 Matemática', pergunta: 'Se sen(x) = 0,5 então x pode ser:', opcoes: ['30°', '45°', '60°', '90°'], correta: 0, explicacao: 'sen(30°) = 1/2 — trigonometria no triângulo retângulo! 📐' }
    ]
  };

  const perguntas = perguntasPorNivel[nivelEnsino] || perguntasPorNivel.fundamental1;

  const registrarResposta = (canal) => {
    setDiagnostico(prev => ({ ...prev, [canal]: prev[canal] + 1 }));
    if (perguntaAtual + 1 >= perguntasDiagnostico.length) setEtapa('resultadoDiagnostico');
    else setPerguntaAtual(prev => prev + 1);
  };

  const getCanalPredominante = () => Object.entries(diagnostico).sort((a, b) => b[1] - a[1])[0][0];
  const infoCanal = canais.find(c => c.chave === getCanalPredominante());
  const infoNivel = niveisEnsino.find(n => n.id === nivelEnsino);

  const responderQuiz = (indice) => {
    setRespostaSelecionada(indice);
    const pergunta = perguntas[perguntaAtual];
    if (indice === pergunta.correta) {
      setEstrela(true);
      setPontos(prev => prev + 10 * fase);
      setTimeout(() => {
        setEstrela(false);
        if (perguntaAtual + 1 >= perguntas.length) setEtapa('concluido');
        else { setPerguntaAtual(prev => prev + 1); setRespostaSelecionada(null); }
      }, 1500);
    } else setTimeout(() => setRespostaSelecionada(null), 1500);
  };

  const reiniciar = () => {
    setEtapa('inicio'); setPerguntaAtual(0); setRespostaSelecionada(null);
    setDiagnostico({ visual:0, auditivo:0, cinestesico:0, leitura:0 });
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <header style={{
        padding: '1.2rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.25)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{
          fontSize: '1.5rem', fontWeight: 'bold', margin: 0,
          background: 'linear-gradient(90deg, #f093fb, #f5576a, #ffd89b)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>🎮 EducaGam</h1>
        {etapa !== 'inicio' && etapa !== 'escolhaNivel' && (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {infoNivel && (
              <span style={{
                background: `${infoNivel.cor}22`,
                padding: '0.4rem 0.8rem', borderRadius: '1rem',
                fontSize: '0.85rem', border: `1px solid ${infoNivel.cor}44`
              }}>{infoNivel.nome}</span>
            )}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Fase</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ffd700' }}>⭐ {fase}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Pontos</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#7fff7f' }}>{pontos}</div>
            </div>
            <button onClick={() => setEtapa('geometria')} style={{
              padding: '0.5rem 1rem', borderRadius: '2rem', border: 'none',
              background: 'linear-gradient(90deg, #4fd1c5, #38b2ac)', color: 'white',
              cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold'
            }}>📐 Geometria</button>
          </div>
        )}
      </header>

      <div style={{
        maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 2rem',
        opacity: animarEntrada ? 1 : 0, transform: animarEntrada ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out'
      }}>

        {/* TELA INICIAL */}
        {etapa === 'inicio' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀✨🌟</div>
            <h2 style={{ fontSize: '2.3rem', marginBottom: '1rem' }}>Bem-vindo ao EducaGam!</h2>
            <p style={{ fontSize: '1.1rem', color: '#d0d0d0', marginBottom: '2rem' }}>
              Da Alfabetização ao Ensino Médio — aprender é a maior aventura! �🇧🇷
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '2rem',
              marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '1rem' }}>Qual é o seu nome?</label>
              <input type="text" placeholder="Digite seu nome..." value={nome}
                onChange={(e) => setNome(e.target.value)} style={{
                  width: '100%', padding: '0.9rem 1.2rem', fontSize: '1rem', borderRadius: '0.7rem',
                  border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)',
                  color: 'white', outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f093fb'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
            </div>
            <button onClick={() => nome.trim() && setEtapa('escolhaNivel')} disabled={!nome.trim()} style={{
              padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '3rem', border: 'none',
              background: nome.trim() ? 'linear-gradient(90deg, #f093fb, #f5576a)' : '#444',
              color: 'white', cursor: nome.trim() ? 'pointer' : 'not-allowed',
              boxShadow: nome.trim() ? '0 4px 20px rgba(240,147,251,0.35)' : 'none',
              transition: 'transform 0.3s ease'
            }}
              onMouseOver={(e) => nome.trim() && (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => nome.trim() && (e.target.style.transform = 'scale(1)')}
            >
              Começar Minha Jornada → 🌟
            </button>
          </div>
        )}

        {/* ESCOLHA DE NÍVEL DE ENSINO */}
        {etapa === 'escolhaNivel' && (
          <div>
            <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              Olá, {nome}! Vamos escolher seu nível 📚
            </h3>
            <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '2rem' }}>
              Conteúdo alinhado à BNCC e Currículo Paulista 🇧🇷
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {niveisEnsino.map(nivel => (
                <button key={nivel.id} onClick={() => { setNivelEnsino(nivel.id); setEtapa('diagnostico'); }} style={{
                  padding: '1.5rem 2rem', borderRadius: '1rem', border: '2px solid transparent',
                  borderLeft: `4px solid ${nivel.cor}`,
                  background: 'rgba(255,255,255,0.06)', color: 'white', textAlign: 'left',
                  cursor: 'pointer', transition: 'all 0.3s ease'
                }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.12)';
                    e.target.style.borderColor = nivel.cor;
                    e.target.style.transform = 'translateX(6px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{nivel.nome}</div>
                  <div style={{ fontSize: '0.9rem', color: '#aaa' }}>{nivel.desc}</div>
                  <div style={{ fontSize: '0.8rem', color: nivel.cor, marginTop: '0.5rem' }}>Faixa: {nivel.faixa}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* DIAGNÓSTICO COGNITIVO */}
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
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Vamos te conhecer melhor 🧠</h3>
            <p style={{ color: '#aaa', marginBottom: '2rem' }}>Pergunta {perguntaAtual + 1} de {perguntasDiagnostico.length}</p>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>{perguntasDiagnostico[perguntaAtual].texto}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {perguntasDiagnostico[perguntaAtual].opcoes.map((op, i) => (
                <button key={i} onClick={() => registrarResposta(op.canal)} style={{
                  padding: '1.1rem 1.5rem', fontSize: '1rem', borderRadius: '0.8rem',
                  border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
                  color: 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.3s ease'
                }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(240,147,251,0.18)';
                    e.target.style.borderColor = '#f093fb';
                    e.target.style.transform = 'translateX(8px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >{op.texto}</button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTADO DO DIAGNÓSTICO */}
        {etapa === 'resultadoDiagnostico' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨🎉✨</div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Descobrimos algo incrível, {nome}!</h3>
            <div style={{
              background: 'linear-gradient(135deg, rgba(240,147,251,0.2), rgba(85,108,255,0.15))',
              borderRadius: '1.5rem', padding: '2rem', marginBottom: '2rem',
              border: '2px solid rgba(240,147,251,0.3)'
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{infoCanal?.nome}</div>
              <p style={{ fontSize: '1rem', color: '#ddd' }}>{infoCanal?.desc}</p>
              <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#aaa' }}>
                Nível selecionado: <strong style={{ color: infoNivel?.cor }}>{infoNivel?.nome}</strong>
              </p>
            </div>
            <p style={{ marginBottom: '2rem', color: '#aaa' }}>Todo o conteúdo será adaptado para o seu estilo! 🎯</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setEtapa('quiz'); setPerguntaAtual(0); }} style={{
                padding: '1rem 2rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '3rem', border: 'none',
                background: 'linear-gradient(90deg, #7fff7f, #00c9ff)', color: '#000', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(127,255,127,0.3)'
              }}>📚 Iniciar Quiz</button>
              <button onClick={() => setEtapa('geometria')} style={{
                padding: '1rem 2rem', fontSize: '1rem', fontWeight: 'bold', borderRadius: '3rem', border: 'none',
                background: 'linear-gradient(90deg, #4fd1c5, #319795)', color: 'white', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(79,209,197,0.3)'
              }}>📐 Explorar Geometria</button>
            </div>
          </div>
        )}

        {/* GEOMETRIA INTERATIVA */}
        {etapa === 'geometria' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📐 Geometria Dinâmica</h2>
              <p style={{ color: '#aaa' }}>Arraste e veja as formas mudarem em tempo real! ✨</p>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {[
                { id: 'triangulo', nome: '🔺 Triângulo' },
                { id: 'quadrado', nome: '⬜ Quadrado' },
                { id: 'retangulo', nome: '▬ Retângulo' },
                { id: 'circulo', nome: '⭕ Círculo' }
              ].map(f => (
                <button key={f.id} onClick={() => setFormaAtiva(f.id)} style={{
                  padding: '0.7rem 1.2rem', borderRadius: '0.8rem', border: 'none',
                  background: formaAtiva === f.id ? 'linear-gradient(90deg, #4fd1c5, #9f7aea)' : 'rgba(255,255,255,0.08)',
                  color: 'white', cursor: 'pointer', fontWeight: formaAtiva === f.id ? 'bold' : 'normal',
                  transform: formaAtiva === f.id ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.2s ease'
                }}>{f.nome}</button>
              ))}
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.05)', borderRadius: '1.2rem', padding: '1.2rem',
              marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <canvas ref={canvasRef} width={600} height={380} style={{
                width: '100%', height: 'auto', borderRadius: '0.6rem', background: 'rgba(0,0,0,0.25)'
              }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
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

            <div style={{
              background: 'rgba(79,209,197,0.08)', borderRadius: '1rem', padding: '1.2rem',
              border: '1px solid rgba(79,209,197,0.2)'
            }}>
              <button onClick={() => setMostrarDica(!mostrarDica)} style={{
                background: 'none', border: 'none', color: '#4fd1c5', fontSize: '1rem',
                cursor: 'pointer', fontWeight: 'bold', width: '100%', textAlign: 'left'
              }}>
                💡 {mostrarDica ? 'Ocultar' : 'Ver'} conceito matemático ▼
              </button>
              {mostrarDica && (
                <div style={{ marginTop: '1rem', color: '#d0d0d0', lineHeight: '1.7' }}>
                  {formaAtiva === 'triangulo' && (<>• Soma dos ângulos = <strong>180°</strong><br/>• Área = base × altura ÷ 2</>)}
                  {formaAtiva === 'quadrado' && (<>• Lados iguais, ângulos = 90°<br/>• Área = lado²<br/>• Perímetro = 4 × lado</>)}
                  {formaAtiva === 'retangulo' && (<>• Lados opostos iguais<br/>• Área = comprimento × largura<br/>• Perímetro = 2 × (C + L)</>)}
                  {formaAtiva === 'circulo' && (<>• Diâmetro = 2 × raio<br/>• Perímetro = 2πr ≈ 6,28 × r<br/>• Área = πr² ≈ 3,14 × r²</>)}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button onClick={() => setEtapa('quiz')} style={{
                padding: '0.8rem 1.5rem', borderRadius: '2rem', border: 'none',
                background: 'rgba(127,255,127,0.15)', color: '#7fff7f', cursor: 'pointer'
              }}>📚 Ir para o Quiz</button>
              <button onClick={() => setEtapa('inicio')} style={{
                padding: '0.8rem 1.5rem', borderRadius: '2rem', border: 'none',
                background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer'
              }}>🏠 Início</button>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {etapa === 'quiz' && (
          <div style={{ textAlign: 'center' }}>
            {estrela && (
              <div style={{
                position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                fontSize: '3.5rem', zIndex: 200, animation: 'pulse 0.5s ease-in-out'
              }}>⭐ +{10 * fase} pts!</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
                {perguntas[perguntaAtual].materia}
              </span>
              <span style={{ color: '#aaa' }}>{perguntaAtual + 1} / {perguntas.length}</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', marginBottom: '1.5rem' }}>
              <div style={{
                width: `${((perguntaAtual + 1) / perguntas.length) * 100}%`, height: '100%',
                background: 'linear-gradient(90deg, #7fff7f, #00c9ff)', borderRadius: '3px', transition: 'width 0.5s ease'
              }} />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
              {perguntas[perguntaAtual].pergunta}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              {perguntas[perguntaAtual].opcoes.map((op, i) => {
                let estilo = {
                  padding: '1.1rem', fontSize: '1rem', borderRadius: '0.8rem',
                  border: '2px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
                  color: 'white', cursor: respostaSelecionada === null ? 'pointer' : 'default', transition: 'all 0.3s ease'
                };
                if (respostaSelecionada !== null) {
                  if (i === perguntas[perguntaAtual].correta) {
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
              <p style={{ marginTop: '1.5rem', color: respostaSelecionada === perguntas[perguntaAtual].correta ? '#7fff7f' : '#ff8888' }}>
                {respostaSelecionada === perguntas[perguntaAtual].correta
                  ? perguntas[perguntaAtual].explicacao
                  : 'Não foi dessa vez! Estude e tente novamente 💪'}
              </p>
            )}
            <div style={{ marginTop: '2rem' }}>
              <button onClick={() => setEtapa('geometria')} style={{
                padding: '0.75rem 1.5rem', borderRadius: '2rem', border: 'none',
                background: 'rgba(79,209,197,0.15)', color: '#4fd1c5', cursor: 'pointer'
              }}>📐 Explorar Geometria</button>
            </div>
          </div>
        )}

        {/* CONCLUSÃO */}
        {etapa === 'concluido' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🏆🎉🌟</div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Missão Cumprida, {nome}! 🚀</h2>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.1))',
              borderRadius: '1.5rem', padding: '2rem', marginBottom: '2rem',
              border: '2px solid rgba(255,215,0,0.3)'
            }}>
              <p style={{ fontSize: '1.1rem' }}>Nível: <strong>{infoNivel?.nome}</strong></p>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffd700', margin: '1rem 0' }}>{pontos} Pontos ⭐</p>
              <p style={{ fontSize: '0.95rem', color: '#aaa' }}>Estilo de aprendizagem: {infoCanal?.nome}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { reiniciar(); setPontos(0); setFase(1); setNivelEnsino(null); }} style={{
                padding: '1rem 1.5rem', borderRadius: '2rem', border: 'none',
                background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer'
              }}>🔄 Mudar Nível</button>
              <button onClick={() => { reiniciar(); setFase(prev => prev + 1); }} style={{
                padding: '1rem 1.5rem', borderRadius: '2rem', border: 'none',
                background: 'linear-gradient(90deg, #ffd700, #ff8c00)', color: '#000', cursor: 'pointer', fontWeight: 'bold'
              }}>Subir de Fase ⬆️</button>
              <button onClick={() => setEtapa('geometria')} style={{
                padding: '1rem 1.5rem', borderRadius: '2rem', border: 'none',
                background: 'linear-gradient(90deg, #4fd1c5, #319795)', color: 'white', cursor: 'pointer', fontWeight: 'bold'
              }}>📐 Geometria</button>
            </div>
          </div>
        )}
      </div>

      <footer style={{ textAlign: 'center', padding: '2rem', color: '#666', fontSize: '0.85rem', marginTop: '2rem' }}>
        <p>🎮 EducaGam — Da Alfabetização ao Ensino Médio 🇧🇷</p>
        <p>Conteúdo alinhado à BNCC e Currículo Paulista ✨</p>
      </footer>

      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.25); }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
