'use client';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [nome, setNome] = useState('');
  const [etapa, setEtapa] = useState('inicio');
  const [ciclo, setCiclo] = useState(null);
  const [materia, setMateria] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [fase, setFase] = useState(1);
  const [estrela, setEstrela] = useState(false);
  const [diagnostico, setDiagnostico] = useState({ visual: 0, auditivo: 0, cinestesico: 0, leitura: 0 });
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [animarEntrada, setAnimarEntrada] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => { setAnimarEntrada(true); }, []);

  // ==============================================
  // 📚 ESTRUTURA OFICIAL: BNCC + CURRÍCULO PAULISTA
  // ==============================================
  const ciclos = [
    {
      id: 'alfabetizacao',
      nome: '🔤 Alfabetização',
      faixa: '4 a 7 anos',
      cor: '#f687b3',
      desc: 'Leitura, escrita, primeiros números e mundo ao redor',
      base: 'BNCC — Educação Infantil / Anos Iniciais',
      materias: [
        { id: 'portugues', nome: '📝 Língua Portuguesa', habilidade: 'Leitura, escrita e interpretação de textos', bncc: 'EF01LP01, EF01LP02, EF02LP01' },
        { id: 'matematica', nome: '🔢 Matemática', habilidade: 'Contagem, números e formas geométricas simples', bncc: 'EF01MA01, EF01MA05, EF02MA14' },
        { id: 'ciencias', nome: '🌿 Ciências', habilidade: 'Corpo, natureza e fenômenos do dia a dia', bncc: 'EF01CI01, EF01CI03' },
        { id: 'geografia', nome: '🗺️ Geografia', habilidade: 'Espaço, lugares e orientação', bncc: 'EF01GE01, EF01GE04' },
        { id: 'historia', nome: '📜 História', habilidade: 'Tempo, família e comunidade', bncc: 'EF01HI01, EF01HI03' },
        { id: 'arte', nome: '🎨 Arte', habilidade: 'Expressão, cores e formas', bncc: 'EF01AR01, EF01AR03' },
        { id: 'edfisica', nome: '🏃 Educação Física', habilidade: 'Movimento, coordenação e cooperação', bncc: 'EF01EF01, EF01EF04' }
      ]
    },
    {
      id: 'fundamental1',
      nome: '📗 Fundamental I',
      faixa: '1º ao 5º ano / 6 a 10 anos',
      cor: '#68d391',
      desc: 'Consolidação da leitura, raciocínio e conhecimentos do mundo',
      base: 'BNCC + Currículo Paulista — Anos Iniciais',
      materias: [
        { id: 'portugues', nome: '📝 Língua Portuguesa', habilidade: 'Leitura fluente, gramática e produção textual', bncc: 'EF03LP03, EF04LP06, EF05LP08' },
        { id: 'matematica', nome: '🔢 Matemática', habilidade: 'Operações, frações, medidas e geometria', bncc: 'EF03MA03, EF04MA13, EF05MA17' },
        { id: 'ciencias', nome: '🌿 Ciências', habilidade: 'Seres vivos, matéria, energia e meio ambiente', bncc: 'EF03CI02, EF04CI03, EF05CI06' },
        { id: 'geografia', nome: '🗺️ Geografia', habilidade: 'Mapas, regiões, clima e população', bncc: 'EF03GE01, EF04GE05, EF05GE08' },
        { id: 'historia', nome: '📜 História', habilidade: 'Origem, povoamento e identidade brasileira', bncc: 'EF03HI02, EF04HI03, EF05HI07' },
        { id: 'arte', nome: '🎨 Arte', habilidade: 'Linguagens artísticas e produção cultural', bncc: 'EF03AR02, EF04AR04' },
        { id: 'edfisica', nome: '🏃 Educação Física', habilidade: 'Jogos, regras e saúde', bncc: 'EF03EF03, EF04EF05' },
        { id: 'ingles', nome: '🌎 Língua Inglesa', habilidade: 'Palavras, frases e compreensão oral', bncc: 'EF03LI01, EF05LI04' }
      ]
    },
    {
      id: 'fundamental2',
      nome: '📘 Fundamental II',
      faixa: '6º ao 9º ano / 10 a 15 anos',
      cor: '#63b3ed',
      desc: 'Aprofundamento das áreas e pensamento crítico',
      base: 'BNCC + Currículo Paulista — Anos Finais',
      materias: [
        { id: 'portugues', nome: '📝 Língua Portuguesa', habilidade: 'Análise linguística, interpretação e redação', bncc: 'EF06LP05, EF07LP09, EF08LP03, EF09LP06' },
        { id: 'matematica', nome: '📐 Matemática', habilidade: 'Álgebra, funções, geometria e estatística', bncc: 'EF06MA12, EF07MA18, EF08MA22, EF09MA15' },
        { id: 'ciencias', nome: '🔬 Ciências', habilidade: 'Corpo humano, ecossistemas, matéria e energia', bncc: 'EF06CI03, EF07CI05, EF08CI07, EF09CI11' },
        { id: 'historia', nome: '📜 História', habilidade: 'Mundo, Brasil, Império, República e Cidadania', bncc: 'EF06HI04, EF07HI08, EF08HI12, EF09HI15' },
        { id: 'geografia', nome: '🗺️ Geografia', habilidade: 'Globalização, economia, biomas e território', bncc: 'EF06GE06, EF07GE09, EF08GE13, EF09GE16' },
        { id: 'arte', nome: '🎨 Arte', habilidade: 'História da arte e diversidade cultural', bncc: 'EF06AR03, EF07AR05, EF08AR07' },
        { id: 'edfisica', nome: '🏃 Educação Física', habilidade: 'Esportes, lazer e qualidade de vida', bncc: 'EF06EF02, EF07EF04, EF08EF06' },
        { id: 'ingles', nome: '🌎 Língua Inglesa', habilidade: 'Comunicação, leitura e escrita', bncc: 'EF06LI04, EF07LI06, EF08LI09' }
      ]
    },
    {
      id: 'medio',
      nome: '📕 Ensino Médio',
      faixa: '1ª à 3ª série / 15 a 18 anos',
      cor: '#b794f4',
      desc: 'Preparação para vida, vestibular e mundo do trabalho',
      base: 'BNCC + Currículo Paulista — Ensino Médio',
      materias: [
        { id: 'portugues', nome: '📝 Língua Portuguesa', habilidade: 'Literatura, interpretação e produção argumentativa', bncc: 'EM13LP03, EM13LP06, EM13LP11' },
        { id: 'matematica', nome: '📐 Matemática', habilidade: 'Funções, trigonometria, estatística e matemática financeira', bncc: 'EM13MAT02, EM13MAT08, EM13MAT15' },
        { id: 'fisica', nome: '⚛️ Física', habilidade: 'Mecânica, termologia, eletricidade e ondas', bncc: 'EM13CNT02, EM13CNT04, EM13CNT06' },
        { id: 'quimica', nome: '🧪 Química', habilidade: 'Matéria, reações, tabela periódica e soluções', bncc: 'EM13CNT09, EM13CNT12, EM13CNT14' },
        { id: 'biologia', nome: '🧬 Biologia', habilidade: 'Célula, genética, ecologia e fisiologia humana', bncc: 'EM13CNT17, EM13CNT20, EM13CNT23' },
        { id: 'historia', nome: '📜 História', habilidade: 'História do Brasil, do Mundo e pensamento contemporâneo', bncc: 'EM13CHS02, EM13CHS05, EM13CHS08' },
        { id: 'geografia', nome: '🗺️ Geografia', habilidade: 'Geopolítica, desenvolvimento e sustentabilidade', bncc: 'EM13CHS11, EM13CHS14, EM13CHS16' },
        { id: 'filosofia', nome: '💭 Filosofia', habilidade: 'Ética, lógica, conhecimento e política', bncc: 'EM13CHS19, EM13CHS21' },
        { id: 'sociologia', nome: '👥 Sociologia', habilidade: 'Sociedade, cultura, desigualdade e cidadania', bncc: 'EM13CHS24, EM13CHS26' },
        { id: 'arte', nome: '🎨 Arte', habilidade: 'Estética, movimentos e produção artística', bncc: 'EM13LGG07, EM13LGG09' },
        { id: 'edfisica', nome: '🏃 Educação Física', habilidade: 'Corpo, cultura e saúde', bncc: 'EM13LGG12, EM13LGG14' },
        { id: 'ingles', nome: '🌎 Língua Inglesa', habilidade: 'Comunicação avançada e compreensão de textos', bncc: 'EM13LGG17, EM13LGG20' }
      ]
    }
  ];

  // ==============================================
  // 📝 BANCO DE PERGUNTAS POR CICLO E MATÉRIA
  // ==============================================
  const bancoPerguntas = {
    alfabetizacao: {
      portugues: [
        { pergunta: 'Qual letra inicia a palavra "CASA"?', opcoes: ['S', 'C', 'A', 'M'], correta: 1, explicacao: 'C-A-S-A → começa com C! 🏠' },
        { pergunta: 'Qual destas é uma vogal?', opcoes: ['B', 'E', 'D', 'F'], correta: 1, explicacao: 'E é uma vogal! ✨' },
        { pergunta: 'Quantas sílabas tem "BOLA"?', opcoes: ['1', '2', '3', '4'], correta: 1, explicacao: 'BO-LA → 2 sílabas! ⚽' }
      ],
      matematica: [
        { pergunta: 'Quanto é 2 + 3?', opcoes: ['4', '5', '6', '7'], correta: 1, explicacao: '2 + 3 = 5! ✋' },
        { pergunta: 'Quantos lados tem um quadrado?', opcoes: ['3', '4', '5', '6'], correta: 1, explicacao: '4 lados iguais! ⬜' },
        { pergunta: 'Qual número vem depois de 9?', opcoes: ['8', '9', '10', '11'], correta: 2, explicacao: '9 → 10! 🔢' }
      ],
      ciencias: [
        { pergunta: 'De onde vem a luz que ilumina o dia?', opcoes: ['Da Lua', 'Do Sol', 'Das estrelas', 'Da rua'], correta: 1, explicacao: 'O Sol é nossa estrela! ☀️' },
        { pergunta: 'O que as plantas precisam para crescer?', opcoes: ['Pedra', 'Água e Sol', 'Plástico', 'Fogo'], correta: 1, explicacao: 'Água + Luz = Vida! 🌱' }
      ],
      geografia: [
        { pergunta: 'Onde moram as pessoas?', opcoes: ['Na Lua', 'Em casas e cidades', 'No mar', 'Nas nuvens'], correta: 1, explicacao: 'Nós vivemos em comunidades! 🏘️' }
      ],
      historia: [
        { pergunta: 'Quem cuida da nossa família?', opcoes: ['Ninguém', 'Os membros da família', 'Só a escola', 'Só os amigos'], correta: 1, explicacao: 'A família é nosso primeiro grupo! ❤️' }
      ]
    },
    fundamental1: {
      portugues: [
        { pergunta: 'Assinale a palavra escrita corretamente:', opcoes: ['CASA', 'CASAH', 'CAZA', 'CASSIA'], correta: 0, explicacao: 'CASA — escrita correta! ✅' },
        { pergunta: 'Qual é o antônimo de "ALEGRE"?', opcoes: ['Feliz', 'Triste', 'Brincalhão', 'Calmo'], correta: 1, explicacao: 'Alegre ↔ Triste são opostos! 😊😢' }
      ],
      matematica: [
        { pergunta: 'Quanto é 25 + 17?', opcoes: ['32', '41', '42', '52'], correta: 2, explicacao: '25 + 17 = 42! ✅' },
        { pergunta: 'Metade de 100 é:', opcoes: ['25', '50', '75', '200'], correta: 1, explicacao: '100 ÷ 2 = 50! ⚖️' },
        { pergunta: 'Um triângulo tem quantos lados?', opcoes: ['2', '3', '4', '5'], correta: 1, explicacao: '3 lados, 3 vértices! 🔺' }
      ],
      ciencias: [
        { pergunta: 'Qual é o planeta onde vivemos?', opcoes: ['Marte', 'Júpiter', 'Terra', 'Lua'], correta: 2, explicacao: 'Planeta Terra! 🌍' },
        { pergunta: 'As plantas liberam qual gás?', opcoes: ['Nitrogênio', 'Oxigênio', 'Gás carbônico', 'Hélio'], correta: 1, explicacao: 'Elas nos dão oxigênio! 🌳' }
      ],
      historia: [
        { pergunta: 'Em que ano o Brasil foi descoberto?', opcoes: ['1492', '1500', '1522', '1600'], correta: 1, explicacao: '22 de abril de 1500! 🇧🇷' }
      ],
      geografia: [
        { pergunta: 'O Brasil fica em qual continente?', opcoes: ['Europa', 'América do Sul', 'Ásia', 'África'], correta: 1, explicacao: 'Maior país da América do Sul! 🗺️' }
      ],
      ingles: [
        { pergunta: 'Como se diz "Olá" em inglês?', opcoes: ['Bye', 'Hello', 'Thanks', 'Yes'], correta: 1, explicacao: 'Hello = Olá! 👋' }
      ]
    },
    fundamental2: {
      portugues: [
        { pergunta: 'Assinale a frase gramaticalmente correta:', opcoes: ['Nós fomos à praia', 'Nós foi na praia', 'Nós vai na praia', 'Nós fomos a praia'], correta: 0, explicacao: 'Usa-se "à" (a + a)! ✅' },
        { pergunta: 'Qual é o sujeito em "O sol brilha"?', opcoes: ['Brilha', 'O sol', 'Não tem', 'O'], correta: 1, explicacao: '"O sol" é quem pratica a ação! ☀️' }
      ],
      matematica: [
        { pergunta: 'Quanto é 7 × 8?', opcoes: ['54', '56', '63', '49'], correta: 1, explicacao: '7 × 8 = 56! Tabuada em dia! 🎯' },
        { pergunta: 'Soma dos ângulos internos de um triângulo:', opcoes: ['90°', '180°', '270°', '360°'], correta: 1, explicacao: 'Sempre 180°, qualquer triângulo! 🔺' },
        { pergunta: 'Qual é o valor de x em 2x = 12?', opcoes: ['4', '5', '6', '12'], correta: 2, explicacao: 'x = 12 ÷ 2 = 6! Álgebra básica! ⚖️' }
      ],
      ciencias: [
        { pergunta: 'Qual é a unidade básica da vida?', opcoes: ['Átomo', 'Célula', 'Tecido', 'Órgão'], correta: 1, explicacao: 'A célula é a unidade viva! 🧫' },
        { pergunta: 'A água é composta por quais elementos?', opcoes: ['Oxigênio e Carbono', 'Hidrogênio e Oxigênio', 'Hélio e Ferro', 'Nitrogênio e Hidrogênio'], correta: 1, explicacao: 'H₂O = 2 Hidrogênios + 1 Oxigênio! 💧' }
      ],
      historia: [
        { pergunta: 'A Independência do Brasil foi em:', opcoes: ['1808', '1822', '1889', '1500'], correta: 1, explicacao: '7 de setembro de 1822! 🇧🇷' },
        { pergunta: 'Qual foi o regime que durou de 1964 a 1986 no Brasil?', opcoes: ['Império', 'República Velha', 'Ditadura Militar', 'Nova República'], correta: 2, explicacao: 'Período da Ditadura Militar! 📜' }
      ],
      geografia: [
        { pergunta: 'O clima predominante no Brasil é:', opcoes: ['Temperado', 'Tropical', 'Polar', 'Mediterrâneo'], correta: 1, explicacao: 'Brasil é um país tropical! 🌴' },
        { pergunta: 'A floresta que ocupa a maior parte do norte do Brasil:', opcoes: ['Mata Atlântica', 'Cerrado', 'Amazônia', 'Pampa'], correta: 2, explicacao: 'Floresta Amazônica! Pulmão do mundo! 🌳' }
      ],
      ingles: [
        { pergunta: 'What is your name? significa:', opcoes: ['Qual a sua idade?', 'Qual o seu nome?', 'De onde você é?', 'Onde você mora?'], correta: 1, explicacao: 'Significa "Qual o seu nome?" ✅' }
      ]
    },
    medio: {
      portugues: [
        { pergunta: 'Em "Não te amo mais", a figura de linguagem é:', opcoes: ['Metáfora', 'Antítese', 'Hipérbole', 'Personificação'], correta: 1, explicacao: 'Reúne ideias opostas: amar e não amar! ⚖️' },
        { pergunta: 'Assinale a concordância correta:', opcoes: ['Fazem dois anos', 'Faz dois anos', 'Fazem dois ano', 'Fazem dois anoes'], correta: 1, explicacao: 'Verbo impessoal não flexiona! ✅' }
      ],
      matematica: [
        { pergunta: 'A raiz quadrada de 144 é:', opcoes: ['10', '11', '12', '14'], correta: 2, explicacao: '12 × 12 = 144 → √144 = 12 ✅' },
        { pergunta: 'Se sen(x) = 0,5 então x = ?', opcoes: ['30°', '45°', '60°', '90°'], correta: 0, explicacao: 'sen(30°) = 1/2 — trigonometria! 📐' },
        { pergunta: 'O produto das raízes de x² - 5x + 6 = 0 é:', opcoes: ['-5', '5', '-6', '6'], correta: 3, explicacao: 'Produto = c/a = 6/1 = 6 — fórmula de Bhaskara! 📝' }
      ],
      fisica: [
        { pergunta: 'A aceleração da gravidade na Terra é aproximadamente:', opcoes: ['5 m/s²', '9,8 m/s²', '15 m/s²', '20 m/s²'], correta: 1, explicacao: 'g ≈ 9,8 m/s²! Força da gravidade! 🌍' },
        { pergunta: 'Um corpo em queda livre converte energia:', opcoes: ['Elástica → Cinética', 'Potencial gravitacional → Cinética', 'Química → Térmica', 'Nuclear → Elétrica'], correta: 1, explicacao: 'Conversão de energia! ⬇️⚡' }
      ],
      quimica: [
        { pergunta: 'O número de prótons define o(a):', opcoes: ['Massa atômica', 'Número atômico', 'Isótopo', 'Valência'], correta: 1, explicacao: 'Z = número de prótons! Identidade do elemento! ⚛️' },
        { pergunta: 'Qual destas é uma reação química?', opcoes: ['Ferro enferrujando', 'Gelo derretendo', 'Água fervendo', 'Areia no vidro'], correta: 0, explicacao: 'Forma nova substância! 🧪' }
      ],
      biologia: [
        { pergunta: 'O DNA fica principalmente no(a):', opcoes: ['Citoplasma', 'Núcleo', 'Membrana', 'Lisossomo'], correta: 1, explicacao: 'O núcleo protege o material genético! 🧬' },
        { pergunta: 'A fotossíntese ocorre nos:', opcoes: ['Mitocôndrias', 'Cloroplastos', 'Ribossomos', 'Lisossomos'], correta: 1, explicacao: 'Cloroplastos captam a luz! 🌿☀️' }
      ],
      historia: [
        { pergunta: 'A Primeira Guerra Mundial durou de:', opcoes: ['1914–1918', '1939–1945', '1918–1926', '1945–1950'], correta: 0, explicacao: '1914 a 1918 — "A Grande Guerra"! 📜' },
        { pergunta: 'O que marcou a Revolução Industrial?', opcoes: ['Uso de máquinas a vapor', 'Descobrimento da América', 'Revolução Francesa', 'Queda do Muro de Berlim'], correta: 0, explicacao: 'Máquinas transformaram a produção! 🏭' }
      ],
      geografia: [
        { pergunta: 'O Mercosul é um bloco econômico da:', opcoes: ['América do Norte', 'América do Sul', 'Europa', 'Ásia'], correta: 1, explicacao: 'Brasil, Argentina, Paraguai, Uruguai... 🤝' },
        { pergunta: 'O efeito estufa é intensificado principalmente pelo excesso de:', opcoes: ['Oxigênio', 'CO₂', 'Nitrogênio', 'Hidrogênio'], correta: 1, explicacao: 'Gás carbônico retém calor! Aquecimento global! 🌡️' }
      ],
      filosofia: [
        { pergunta: '"Penso, logo existo" é de:', opcoes: ['Sócrates', 'Platão', 'Descartes', 'Kant'], correta: 2, explicacao: 'René Descartes — racionalismo! 💭' },
        { pergunta: 'A ética estuda principalmente:', opcoes: ['A beleza', 'O que é certo e errado', 'A lógica formal', 'A natureza'], correta: 1, explicacao: 'Reflexão sobre conduta humana! ⚖️' }
      ]
    }
  };

  // ==============================================
  // 🧠 DIAGNÓSTICO COGNITIVO
  // ==============================================
  const canais = [
    { chave: 'visual', nome: '🎨 Visual', desc: 'Aprende vendo imagens, gráficos e cores' },
    { chave: 'auditivo', nome: '🎧 Auditivo', desc: 'Aprende ouvindo, explicando e debatendo' },
    { chave: 'cinestesico', nome: '✋ Cinestésico', desc: 'Aprende fazendo, tocando e movimentando' },
    { chave: 'leitura', nome: '📖 Leitura/Escrita', desc: 'Aprende lendo e escrevendo' }
  ];

  const perguntasDiagnostico = [
    { texto: 'Quando quero aprender algo novo, prefiro:', opcoes: [
      { texto: 'Ver figuras, esquemas e vídeos', canal: 'visual' },
      { texto: 'Ouvir explicações e conversar sobre o tema', canal: 'auditivo' },
      { texto: 'Fazer, experimentar e praticar', canal: 'cinestesico' },
      { texto: 'Ler e fazer anotações', canal: 'leitura' }
    ]},
    { texto: 'Lembro-me melhor quando:', opcoes: [
      { texto: 'Visualizo a cena na mente', canal: 'visual' },
      { texto: 'Repito em voz alta ou ouço novamente', canal: 'auditivo' },
      { texto: 'Represento com gestos ou movimento', canal: 'cinestesico' },
      { texto: 'Leio e escrevo várias vezes', canal: 'leitura' }
    ]},
    { texto: 'Nas atividades escolares gosto mais de:', opcoes: [
      { texto: 'Desenhos, gráficos e mapas', canal: 'visual' },
      { texto: 'Debates, músicas e apresentações', canal: 'auditivo' },
      { texto: 'Experimentos, jogos e trabalhos manuais', canal: 'cinestesico' },
      { texto: 'Pesquisas, resumos e redações', canal: 'leitura' }
    ]}
  ];

  const registrarResposta = (canal) => {
    setDiagnostico(prev => ({ ...prev, [canal]: prev[canal] + 1 }));
    if (perguntaAtual + 1 >= perguntasDiagnostico.length) {
      setEtapa('escolhaMateria');
      setPerguntaAtual(0);
    } else {
      setPerguntaAtual(prev => prev + 1);
    }
  };

  const getCanalPredominante = () => Object.entries(diagnostico).sort((a, b) => b[1] - a[1])[0][0];
  const infoCanal = canais.find(c => c.chave === getCanalPredominante());
  const infoCiclo = ciclos.find(c => c.id === ciclo);
  const infoMateria = infoCiclo?.materias.find(m => m.id === materia);
  const perguntas = bancoPerguntas[ciclo]?.[materia] || [];

  const responderQuiz = (indice) => {
    setRespostaSelecionada(indice);
    const pergunta = perguntas[perguntaAtual];
    if (indice === pergunta.correta) {
      setEstrela(true);
      setPontos(prev => prev + 10 * fase);
      setTimeout(() => {
        setEstrela(false);
        if (perguntaAtual + 1 >= perguntas.length) {
          setEtapa('concluido');
        } else {
          setPerguntaAtual(prev => prev + 1);
          setRespostaSelecionada(null);
        }
      }, 1500);
    } else {
      setTimeout(() => setRespostaSelecionada(null), 1500);
    }
  };

  const reiniciar = () => {
    setEtapa('inicio');
    setPerguntaAtual(0);
    setRespostaSelecionada(null);
    setDiagnostico({ visual: 0, auditivo: 0, cinestesico: 0, leitura: 0 });
    setCiclo(null);
    setMateria(null);
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
        {etapa !== 'inicio' && etapa !== 'escolhaCiclo' && etapa !== 'escolhaMateria' && (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {infoCiclo && (
              <span style={{
                background: `${infoCiclo.cor}22`,
                padding: '0.4rem 0.8rem', borderRadius: '1rem',
                fontSize: '0.8rem', border: `1px solid ${infoCiclo.cor}44`
              }}>{infoCiclo.nome.split(' ')[0]}</span>
            )}
            {infoMateria && (
              <span style={{ fontSize: '0.85rem', color: '#ffd89b' }}>{infoMateria.nome}</span>
            )}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Fase</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffd700' }}>⭐{fase}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Pontos</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#7fff7f' }}>{pontos}</div>
            </div>
            <button onClick={reiniciar} style={{
              padding: '0.5rem 1rem', borderRadius: '2rem', border: 'none',
              background: 'rgba(255,255,255,0.1)', color: 'white',
              cursor: 'pointer', fontSize: '0.85rem'
            }}>🔄 Reiniciar</button>
          </div>
        )}
      </header>

      <div style={{
        maxWidth: '1000px', margin: '0 auto', padding: '2.5rem 2rem',
        opacity: animarEntrada ? 1 : 0, transform: animarEntrada ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out'
      }}>

        {/* ============================================== */}
        {/* ETAPA 1 — INÍCIO */}
        {/* ============================================== */}
        {etapa === 'inicio' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀✨🌟</div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Bem-vindo ao EducaGam!</h2>
            <p style={{ fontSize: '1.1rem', color: '#d0d0d0', marginBottom: '2rem' }}>
              Da Alfabetização ao Ensino Médio — alinhado à BNCC e Currículo Paulista 🇧🇷
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '2rem',
              marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <label style={{ display: 'block', marginBottom: '0.8rem' }}>Qual é o seu nome?</label>
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
            <button onClick={() => nome.trim() && setEtapa('escolhaCiclo')} disabled={!nome.trim()} style={{
              padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '3rem', border: 'none',
              background: nome.trim() ? 'linear-gradient(90deg, #f093fb, #f5576a)' : '#444',
              color: 'white', cursor: nome.trim() ? 'pointer' : 'not-allowed',
              boxShadow: nome.trim() ? '0 4px 20px rgba(240,147,251,0.35)' : 'none'
            }}>Começar Minha Jornada → 🌟</button>
          </div>
        )}

        {/* ============================================== */}
        {/* ETAPA 2 — ESCOLHA DE CICLO */}
        {/* ============================================== */}
        {etapa === 'escolhaCiclo' && (
          <div>
            <h3 style={{ textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
              Olá, {nome}! Vamos escolher seu nível 📚
            </h3>
            <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '2rem' }}>
              Conteúdo alinhado à BNCC e Currículo Paulista 🇧🇷
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {ciclos.map(c => (
                <button key={c.id} onClick={() => { setCiclo(c.id); setEtapa('diagnostico'); }} style={{
                  padding: '1.5rem 2rem', borderRadius: '1rem', border: '2px solid transparent',
                  borderLeft: `4px solid ${c.cor}`,
                  background: 'rgba(255,255,255,0.06)', color: 'white', textAlign: 'left',
                  cursor: 'pointer', transition: 'all 0.3s ease'
                }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.12)';
                    e.target.style.borderColor = c.cor;
                    e.target.style.transform = 'translateX(6px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                    e.target.style.borderColor = 'transparent';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ fontSize: '1.15rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{c.nome}</div>
                  <div style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '0.4rem' }}>{c.desc}</div>
                  <div style={{ fontSize: '0.8rem', color: c.cor }}>{c.faixa} • {c.base}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============================================== */}
        {/* ETAPA 3 — DIAGNÓSTICO COGNITIVO */}
        {/* ============================================== */}
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
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Vamos conhecer seu jeito de aprender 🧠</h3>
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

        {/* ============================================== */}
        {/* ETAPA 4 — ESCOLHA DE MATÉRIA */}
        {/* ============================================== */}
        {etapa === 'escolhaMateria' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨🎉✨</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Perfil de {nome}!</h3>
              <div style={{
                background: 'linear-gradient(135deg, rgba(240,147,251,0.2), rgba(85,108,255,0.15))',
                borderRadius: '1.5rem', padding: '1.5rem', marginBottom: '1.5rem',
                border: '2px solid rgba(240,147,251,0.3)'
              }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{infoCanal?.nome}</div>
                <p style={{ color: '#ddd', marginTop: '0.5rem' }}>{infoCanal?.desc}</p>
                <p style={{ fontSize: '0.85rem', color: '#aaa', marginTop: '0.8rem' }}>
                  Ciclo: <strong style={{ color: infoCiclo?.cor }}>{infoCiclo?.nome}</strong>
                </p>
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Escolha uma matéria para estudar:</h4>
            </div>
            
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              {infoCiclo?.materias.map(m => (
                <button key={m.id} onClick={() => { setMateria(m.id); setEtapa('quiz'); setPerguntaAtual(0); setRespostaSelecionada(null); }} style={{
                  padding: '1.2rem 1.5rem', borderRadius: '0.8rem', border: 'none',
                  background: 'rgba(255,255,255,0.06)', color: 'white', textAlign: 'left',
                  cursor: 'pointer', transition: 'all 0.3s ease'
                }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.12)';
                    e.target.style.transform = 'translateX(5px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.06)';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{ fontWeight: 'bold' }}>{m.nome}</div>
                  <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.2rem' }}>{m.habilidade}</div>
                  <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.3rem' }}>BNCC: {m.bncc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ============================================== */}
        {/* ETAPA 5 — QUIZ */}
        {/* ============================================== */}
        {etapa === 'quiz' && perguntas.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            {estrela && <div style={{ fontSize: '4rem', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 1000 }}>⭐</div>}
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              {perguntas.map((_, i) => (
                <div key={i} style={{
                  width: i === perguntaAtual ? '2rem' : '0.8rem', height: '0.8rem', borderRadius: '0.4rem',
                  background: i < perguntaAtual ? '#7fff7f' : i === perguntaAtual ? '#ffd700' : '#444',
                  transition: 'all 0.3s ease'
                }} />
              ))}
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{infoMateria?.nome}</h3>
            <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '2rem' }}>
              Competência BNCC: {infoMateria?.bncc}
            </p>

            <div style={{
              background: 'rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '2rem', marginBottom: '2rem'
            }}>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '2rem' }}>{perguntas[perguntaAtual].pergunta}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {perguntas[perguntaAtual].opcoes.map((op, i) => {
                  let estilo = {
                    background: 'rgba(255,255,255,0.08)',
                    border: '2px solid rgba(255,255,255,0.15)'
                  };
                  if (respostaSelecionada !== null) {
                    if (i === perguntas[perguntaAtual].correta) {
                      estilo = { background: 'rgba(127,255,127,0.2)', border: '2px solid #7fff7f' };
                    } else if (i === respostaSelecionada) {
                      estilo = { background: 'rgba
