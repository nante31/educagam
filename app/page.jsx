'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [nome, setNome] = useState('');
  const [etapa, setEtapa] = useState('inicio');
  const [pontos, setPontos] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [estrela, setEstrela] = useState(false);
  const [diagnostico, setDiagnostico] = useState({
    visual: 0, auditivo: 0, cinestesico: 0, leitura: 0
  });
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [animarEntrada, setAnimarEntrada] = useState(false);

  useEffect(() => {
    setAnimarEntrada(true);
  }, []);

  const canais = [
    { chave: 'visual', nome: '🎨 Visual', desc: 'Aprende vendo imagens, cores e gráficos' },
    { chave: 'auditivo', nome: '🎧 Auditivo', desc: 'Aprende ouvindo, explicando e debatendo' },
    { chave: 'cinestesico', nome: '✋ Cinestésico', desc: 'Aprende fazendo, tocando e movimentando' },
    { chave: 'leitura', nome: '📖 Leitura/Escrita', desc: 'Aprende lendo e escrevendo' }
  ];

  const perguntasDiagnostico = [
    {
      texto: 'Quando quero aprender algo novo, prefiro:',
      opcoes: [
        { texto: 'Ver diagramas, figuras e cores', canal: 'visual' },
        { texto: 'Ouvir explicações e debates', canal: 'auditivo' },
        { texto: 'Fazer experiências e praticar', canal: 'cinestesico' },
        { texto: 'Ler textos e fazer anotações', canal: 'leitura' }
      ]
    },
    {
      texto: 'Lembro-me melhor quando:',
      opcoes: [
        { texto: 'Visualizo a cena na minha mente', canal: 'visual' },
        { texto: 'Repito ou ouço a informação em voz alta', canal: 'auditivo' },
        { texto: 'Mexe nas mãos ou represento a situação', canal: 'cinestesico' },
        { texto: 'Escrevo ou leio várias vezes', canal: 'leitura' }
      ]
    },
    {
      texto: 'Nas aulas, gosto mais de:',
      opcoes: [
        { texto: 'Slides, desenhos e vídeos', canal: 'visual' },
        { texto: 'Aula dialogada e música', canal: 'auditivo' },
        { texto: 'Trabalhos manuais e movimento', canal: 'cinestesico' },
        { texto: 'Leitura e produção de texto', canal: 'leitura' }
      ]
    },
    {
      texto: 'Resolvo problemas com:',
      opcoes: [
        { texto: 'Esquemas e desenhos', canal: 'visual' },
        { texto: 'Conversando com alguém', canal: 'auditivo' },
        { texto: 'Testando e errando até acertar', canal: 'cinestesico' },
        { texto: 'Organizando por escrito', canal: 'leitura' }
      ]
    }
  ];

  const perguntasQuiz = [
    {
      materia: 'Matemática',
      nivel: 1,
      pergunta: 'Qual é o resultado de 7 × 8?',
      opcoes: ['54', '56', '63', '49'],
      correta: 1,
      explicacao: '7 × 8 = 56! Parabéns! 🎯'
    },
    {
      materia: 'Português',
      nivel: 1,
      pergunta: 'Assinale a frase CORRETA:',
      opcoes: [
        'Nós fomos na praia ontem.',
        'Nós fomos à praia ontem.',
        'Nós foi na praia ontem.',
        'Nós vamos ir na praia.'
      ],
      correta: 1,
      explicacao: 'Usa-se "à" (a + a) com verbo ir! ✅'
    },
    {
      materia: 'Ciências',
      nivel: 2,
      pergunta: 'Qual é o gás que as plantas precisam para fazer a fotossíntese?',
      opcoes: ['Oxigênio', 'Nitrogênio', 'Gás Carbônico', 'Hidrogênio'],
      correta: 2,
      explicacao: 'As plantas absorvem CO₂ e liberam oxigênio! 🌿🌳'
    },
    {
      materia: 'Matemática',
      nivel: 2,
      pergunta: 'Um triângulo tem quantos graus na soma dos ângulos internos?',
      opcoes: ['90°', '180°', '270°', '360°'],
      correta: 1,
      explicacao: 'Qualquer triângulo sempre soma 180°! 🔺'
    }
  ];

  const registrarResposta = (canal) => {
    setDiagnostico(prev => ({
      ...prev,
      [canal]: prev[canal] + 1
    }));
    if (perguntaAtual + 1 >= perguntasDiagnostico.length) {
      setEtapa('resultadoDiagnostico');
    } else {
      setPerguntaAtual(prev => prev + 1);
    }
  };

  const getCanalPredominante = () => {
    return Object.entries(diagnostico).sort((a, b) => b[1] - a[1])[0][0];
  };

  const responderQuiz = (indice) => {
    setRespostaSelecionada(indice);
    const pergunta = perguntasQuiz[perguntaAtual];
    if (indice === pergunta.correta) {
      setEstrela(true);
      setPontos(prev => prev + 10 * nivel);
      setTimeout(() => {
        setEstrela(false);
        if (perguntaAtual + 1 >= perguntasQuiz.length) {
          setEtapa('concluido');
        } else {
          setPerguntaAtual(prev => prev + 1);
          setRespostaSelecionada(null);
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setRespostaSelecionada(null);
      }, 1500);
    }
  };

  const reiniciar = () => {
    setEtapa('inicio');
    setPerguntaAtual(0);
    setRespostaSelecionada(null);
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
      {/* Cabeçalho */}
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
          fontSize: '1.8rem',
          fontWeight: 'bold',
          margin: 0,
          background: 'linear-gradient(90deg, #f093fb, #f5576a, #ffd89b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 40px rgba(240,147,251,0.3)'
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
          </div>
        )}
      </header>

      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem 2rem',
        opacity: animarEntrada ? 1 : 0,
        transform: animarEntrada ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out'
      }}>

        {/* TELA INICIAL */}
        {etapa === 'inicio' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀✨🌟</div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Bem-vindo ao futuro da aprendizagem!</h2>
            <p style={{ fontSize: '1.2rem', color: '#d0d0d0', marginBottom: '2rem' }}>
              Descubra como você aprende melhor, ganhe pontos, desbloqueie níveis e domine o conhecimento!
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              marginBottom: '2rem',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 8px 32px rgba(31,38,135,0.2)'
            }}>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '1.1rem' }}>
                Qual é o seu nome?
              </label>
              <input
                type="text"
                placeholder="Digite seu nome aqui..."
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem 1.5rem',
                  fontSize: '1.1rem',
                  borderRadius: '0.8rem',
                  border: '2px solid rgba(255,255,255,0.2)',
                  background: 'rgba(0,0,0,0.2)',
                  color: 'white',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f093fb'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
            </div>
            <button
              onClick={() => nome.trim() && setEtapa('diagnostico')}
              disabled={!nome.trim()}
              style={{
                padding: '1rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '3rem',
                border: 'none',
                background: nome.trim()
                  ? 'linear-gradient(90deg, #f093fb, #f5576a)'
                  : '#444',
                color: 'white',
                cursor: nome.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.3s ease',
                boxShadow: nome.trim() ? '0 4px 20px rgba(240,147,251,0.4)' : 'none'
              }}
              onMouseOver={(e) => nome.trim() && (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => nome.trim() && (e.target.style.transform = 'scale(1)')}
            >
              Começar Minha Jornada → 🌟
            </button>
          </div>
        )}

        {/* DIAGNÓSTICO COGNITIVO */}
        {etapa === 'diagnostico' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              {perguntasDiagnostico.map((_, i) => (
                <div key={i} style={{
                  width: i === perguntaAtual ? '2rem' : '0.8rem',
                  height: '0.8rem',
                  borderRadius: '0.4rem',
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
                <button
                  key={i}
                  onClick={() => registrarResposta(op.canal)}
                  style={{
                    padding: '1.2rem 1.5rem',
                    fontSize: '1rem',
                    borderRadius: '0.8rem',
                    border: '2px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(240,147,251,0.2)';
                    e.target.style.borderColor = '#f093fb';
                    e.target.style.transform = 'translateX(8px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.08)';
                    e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  {op.texto}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTADO DO DIAGNÓSTICO */}
        {etapa === 'resultadoDiagnostico' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨🎉✨</div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Descobrimos algo incrível, {nome}!</h3>
            <div style={{
              background: 'linear-gradient(135deg, rgba(240,147,251,0.2), rgba(85,108,255,0.2))',
              borderRadius: '1.5rem',
              padding: '2rem',
              marginBottom: '2rem',
              border: '2px solid rgba(240,147,251,0.3)'
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {infoCanal?.nome}
              </div>
              <p style={{ fontSize: '1.1rem', color: '#ddd' }}>{infoCanal?.desc}</p>
            </div>
            <p style={{ marginBottom: '2rem', color: '#aaa' }}>
              Adaptaremos todo o aprendizado para o seu estilo! 🎯
            </p>
            <button
              onClick={() => { setEtapa('quiz'); setPerguntaAtual(0); }}
              style={{
                padding: '1rem 3rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                borderRadius: '3rem',
                border: 'none',
                background: 'linear-gradient(90deg, #7fff7f, #00c9ff)',
                color: '#000',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(127,255,127,0.3)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Iniciar Aventura de Conhecimento 🚀
            </button>
          </div>
        )}

        {/* QUIZ PRINCIPAL */}
        {etapa === 'quiz' && (
          <div style={{ textAlign: 'center' }}>
            {estrela && (
              <div style={{
                position: 'fixed',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '4rem',
                zIndex: 200,
                animation: 'pulse 0.5s ease-in-out'
              }}>⭐ +{10 * nivel} pontos!</div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '2rem' }}>
                📚 {perguntasQuiz[perguntaAtual].materia}
              </span>
              <span style={{ color: '#aaa' }}>{perguntaAtual + 1} / {perguntasQuiz.length}</span>
            </div>
            <div style={{
              height: '6px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '3px',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: `${((perguntaAtual + 1) / perguntasQuiz.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #7fff7f, #00c9ff)',
                borderRadius: '3px',
                transition: 'width 0.5s ease'
              }} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>
              {perguntasQuiz[perguntaAtual].pergunta}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {perguntasQuiz[perguntaAtual].opcoes.map((op, i) => {
                let estilo = {
                  padding: '1.2rem',
                  fontSize: '1rem',
                  borderRadius: '0.8rem',
                  border: '2px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.08)',
                  color: 'white',
                  cursor: respostaSelecionada === null ? 'pointer' : 'default',
                  transition: 'all 0.3s ease'
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
                  <button
                    key={i}
                    onClick={() => respostaSelecionada === null && responderQuiz(i)}
                    style={estilo}
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
                  >
                    {op}
                  </button>
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
          </div>
        )}

        {/* TELA DE CONCLUSÃO */}
        {etapa === 'concluido' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆🎉🌟</div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Missão Cumprida, {nome}! 🚀</h2>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,165,0,0.1))',
              borderRadius: '1.5rem',
              padding: '2.5rem',
              marginBottom: '2rem',
              border: '2px solid rgba(255,215,0,0.3)'
            }}>
              <p style={{ fontSize: '1.3rem' }}>Você conquistou</p>
              <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ffd700', margin: '1rem 0' }}>{pontos} Pontos ⭐</p>
              <p style={{ fontSize: '1.1rem', color: '#aaa' }}>Canal de aprendizagem: {infoCanal?.nome}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => { reiniciar(); setPontos(0); setNivel(1); }}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  borderRadius: '2rem',
                  border: 'none',
                  background: 'rgba(255,255,255,0.15)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
              >
                🔄 Recomeçar
              </button>
              <button
                onClick={() => { reiniciar(); setNivel(prev => prev + 1); }}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: '2rem',
                  border: 'none',
                  background: 'linear-gradient(90deg, #ffd700, #ff8c00)',
                  color: '#000',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              >
                Subir de Nível ⬆️
              </button>
            </div>
          </div>
        )}

      </div>

      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: '#666',
        fontSize: '0.9rem',
        marginTop: '3rem'
      }}>
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
