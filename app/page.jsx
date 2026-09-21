'use client';
import { useState, useEffect, useRef } from 'react';

export default function EducaGam() {
  const [nome, setNome] = useState('');
  const [etapa, setEtapa] = useState('inicio');
  const [ciclo, setCiclo] = useState(null);
  const [materia, setMateria] = useState(null);
  const [tipoAtividade, setTipoAtividade] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [insignias, setInsignias] = useState([]);
  const [diagnostico, setDiagnostico] = useState({ visual: 0, auditivo: 0, cinestesico: 0, leitura: 0 });
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [animarEntrada, setAnimarEntrada] = useState(false);
  const [modoJogo, setModoJogo] = useState(null);
  const [indiceConteudo, setIndiceConteudo] = useState(0);
  const [aulaAtiva, setAulaAtiva] = useState(null);

  useEffect(() => { setAnimarEntrada(true); }, []);

  // ============================================================
  // 📚 ESTRUTURA OFICIAL — BNCC | CURRÍCULO PAULISTA | LDB
  // ============================================================
  const ciclos = [
    {
      id: 'alfabetizacao',
      nome: '🔤 Alfabetização',
      faixa: '4 a 7 anos',
      cor: '#f687b3',
      desc: 'Leitura, escrita, números e mundo ao redor',
      base: 'BNCC — Educação Infantil / EF Iniciais • LDB Art. 20-21',
      materias: [
        { id: 'portugues', nome: '📝 Língua Portuguesa', eixos: ['Leitura', 'Escrita', 'Oralidade', 'Análise Linguística'], bncc: 'EF01LP01 a EF02LP22', competencia: 'Compreensão e produção de textos' },
        { id: 'matematica', nome: '🔢 Matemática', eixos: ['Números', 'Geometria', 'Medidas', 'Probabilidade'], bncc: 'EF01MA01 a EF02MA20', competencia: 'Pensamento lógico e resolução de problemas' },
        { id: 'ciencias', nome: '🌿 Ciências', eixos: ['Seres Vivos', 'Corpo Humano', 'Meio Ambiente'], bncc: 'EF01CI01 a EF02CI12', competencia: 'Observação e investigação' },
        { id: 'geografia', nome: '🗺️ Geografia', eixos: ['Espaço', 'Lugares', 'Comunidade'], bncc: 'EF01GE01 a EF02GE10', competencia: 'Orientação e convivência social' },
        { id: 'historia', nome: '📜 História', eixos: ['Tempo', 'Família', 'Identidade'], bncc: 'EF01HI01 a EF02HI08', competencia: 'Noção de tempo e pertencimento' },
        { id: 'arte', nome: '🎨 Arte', eixos: ['Desenho', 'Música', 'Dança', 'Teatro'], bncc: 'EF01AR01 a EF02AR12', competencia: 'Expressão e criatividade' },
        { id: 'edfisica', nome: '🏃 Educação Física', eixos: ['Movimento', 'Jogos', 'Saúde'], bncc: 'EF01EF01 a EF02EF08', competencia: 'Coordenação e cooperação' }
      ]
    },
    {
      id: 'fundamental1',
      nome: '📗 Fundamental I',
      faixa: '1º ao 5º ano / 6 a 10 anos',
      cor: '#68d391',
      desc: 'Consolidação da leitura, raciocínio e autonomia',
      base: 'BNCC + Currículo Paulista • LDB Art. 32',
      materias: [
        { id: 'portugues', nome: '📝 Língua Portuguesa', eixos: ['Leitura Fluente', 'Gramática', 'Redação', 'Literatura'], bncc: 'EF03LP01 a EF05LP30', competencia: 'Interpretação e produção argumentativa' },
        { id: 'matematica', nome: '🔢 Matemática', eixos: ['Operações', 'Frações', 'Geometria', 'Medidas'], bncc: 'EF03MA01 a EF05MA28', competencia: 'Raciocínio quantitativo e espacial' },
        { id: 'ciencias', nome: '🌿 Ciências', eixos: ['Ecossistemas', 'Matéria', 'Energia', 'Corpo'], bncc: 'EF03CI01 a EF05CI18', competencia: 'Método científico e sustentabilidade' },
        { id: 'geografia', nome: '🗺️ Geografia', eixos: ['Mapas', 'Regiões', 'Clima', 'População'], bncc: 'EF03GE01 a EF05GE15', competencia: 'Pensamento espacial e cidadania' },
        { id: 'historia', nome: '📜 História', eixos: ['Brasil', 'Povoamento', 'Cultura', 'Cidadania'], bncc: 'EF03HI01 a EF05HI18', competencia: 'Identidade e herança cultural' },
        { id: 'arte', nome: '🎨 Arte', eixos: ['Linguagens', 'Patrimônio', 'Produção'], bncc: 'EF03AR01 a EF05AR15', competencia: 'Apreciação e criação artística' },
        { id: 'edfisica', nome: '🏃 Educação Física', eixos: ['Esportes', 'Lazer', 'Saúde'], bncc: 'EF03EF01 a EF05EF12', competencia: 'Hábitos saudáveis e trabalho em equipe' },
        { id: 'ingles', nome: '🌎 Língua Inglesa', eixos: ['Compreensão', 'Fala', 'Leitura', 'Escrita'], bncc: 'EF03LI01 a EF05LI12', competencia: 'Comunicação intercultural' }
      ]
    },
    {
      id: 'fundamental2',
      nome: '📘 Fundamental II',
      faixa: '6º ao 9º ano / 10 a 15 anos',
      cor: '#63b3ed',
      desc: 'Aprofundamento e pensamento crítico',
      base: 'BNCC + Currículo Paulista • LDB Art. 35',
      materias: [
        { id: 'portugues', nome: '📝 Língua Portuguesa', eixos: ['Análise Crítica', 'Literatura', 'Redação', 'Oralidade'], bncc: 'EF06LP01 a EF09LP40', competencia: 'Leitura crítica e produção de gêneros textuais' },
        { id: 'matematica', nome: '📐 Matemática', eixos: ['Álgebra', 'Funções', 'Geometria', 'Estatística'], bncc: 'EF06MA01 a EF09MA35', competencia: 'Modelagem e raciocínio abstrato' },
        { id: 'ciencias', nome: '🔬 Ciências', eixos: ['Biologia', 'Física', 'Química', 'Tecnologia'], bncc: 'EF06CI01 a EF09CI30', competencia: 'Cientificidade e aplicação tecnológica' },
        { id: 'historia', nome: '📜 História', eixos: ['Mundo', 'Brasil', 'Política', 'Direitos Humanos'], bncc: 'EF06HI01 a EF09HI30', competencia: 'Consciência histórica e cidadania' },
        { id: 'geografia', nome: '🗺️ Geografia', eixos: ['Globalização', 'Economia', 'Biomas', 'Geopolítica'], bncc: 'EF06GE01 a EF09GE25', competencia: 'Compreensão do espaço mundial' },
        { id: 'filosofia', nome: '💭 Filosofia', eixos: ['Lógica', 'Ética', 'Conhecimento'], bncc: 'EF06FI01 a EF09FI10', competencia: 'Pensamento autônomo e reflexivo' },
        { id: 'arte', nome: '🎨 Arte', eixos: ['História da Arte', 'Estética', 'Produção'], bncc: 'EF06AR01 a EF09AR18', competencia: 'Diversidade cultural e expressão' },
        { id: 'edfisica', nome: '🏃 Educação Física', eixos: ['Esportes', 'Corpo', 'Cultura'], bncc: 'EF06EF01 a EF09EF15', competencia: 'Corpo como expressão cultural' },
        { id: 'ingles', nome: '🌎 Língua Inglesa', eixos: ['Fluência', 'Cultura', 'Leitura'], bncc: 'EF06LI01 a EF09LI20', competencia: 'Comunicação em contexto global' }
      ]
    },
    {
      id: 'medio',
      nome: '📕 Ensino Médio',
      faixa: '1ª à 3ª série / 15 a 18 anos',
      cor: '#b794f4',
      desc: 'Preparação para vida, vestibular e mundo do trabalho',
      base: 'BNCC + Currículo Paulista • LDB Art. 36',
      materias: [
        { id: 'portugues', nome: '📝 Língua Portuguesa', eixos: ['Literatura', 'Argumentação', 'Análise', 'Produção'], bncc: 'EM13LP01 a EM13LP25', competencia: 'Domínio da língua e interpretação crítica' },
        { id: 'matematica', nome: '📐 Matemática', eixos: ['Funções', 'Trigonometria', 'Análise', 'Estatística'], bncc: 'EM13MAT01 a EM13MAT30', competencia: 'Pensamento lógico-matemático aplicado' },
        { id: 'fisica', nome: '⚛️ Física', eixos: ['Mecânica', 'Eletromagnetismo', 'Ondas', 'Termodinâmica'], bncc: 'EM13CNT01 a EM13CNT10', competencia: 'Compreensão dos fenômenos naturais' },
        { id: 'quimica', nome: '🧪 Química', eixos: ['Matéria', 'Reações', 'Estequiometria', 'Soluções'], bncc: 'EM13CNT11 a EM13CNT20', competencia: 'Transformação da matéria e sustentabilidade' },
        { id: 'biologia', nome: '🧬 Biologia', eixos: ['Célula', 'Genética', 'Ecologia', 'Fisiologia'], bncc: 'EM13CNT21 a EM13CNT30', competencia: 'Vida e saúde no planeta' },
        { id: 'historia', nome: '📜 História', eixos: ['Mundo Moderno', 'Brasil', 'Contemporâneo'], bncc: 'EM13CHS01 a EM13CHS10', competencia: 'Análise crítica da sociedade' },
        { id: 'geografia', nome: '🗺️ Geografia', eixos: ['Geopolítica', 'Desenvolvimento', 'Sustentabilidade'], bncc: 'EM13CHS11 a EM13CHS20', competencia: 'Relação sociedade-natureza' },
        { id: 'filosofia', nome: '💭 Filosofia', eixos: ['Ética', 'Política', 'Conhecimento'], bncc: 'EM13CHS21 a EM13CHS28', competencia: 'Pensamento crítico e autonomia' },
        { id: 'sociologia', nome: '👥 Sociologia', eixos: ['Sociedade', 'Cultura', 'Desigualdade', 'Cidadania'], bncc: 'EM13CHS29 a EM13CHS35', competencia: 'Compreensão da dinâmica social' },
        { id: 'arte', nome: '🎨 Arte', eixos: ['Estética', 'Movimentos', 'Produção'], bncc: 'EM13LGG01 a EM13LGG10', competencia: 'Sensibilidade e expressão' },
        { id: 'edfisica', nome: '🏃 Educação Física', eixos: ['Saúde', 'Corpo', 'Lazer'], bncc: 'EM13LGG11 a EM13LGG15', competencia: 'Bem-estar e qualidade de vida' },
        { id: 'ingles', nome: '🌎 Língua Inglesa', eixos: ['Fluência', 'Preparação Internacional'], bncc: 'EM13LGG16 a EM13LGG22', competencia: 'Comunicação global' }
      ]
    }
  ];

  // ============================================================
  // 🎮 TIPOS DE JOGOS E ATIVIDADES
  // ============================================================
  const tiposAtividade = [
    { id: 'quiz', nome: '❓ Quiz Desafio', desc: 'Perguntas e respostas com pontuação', cor: '#ffd700' },
    { id: 'aventura', nome: '🗺️ Aventura do Conhecimento', desc: 'Fases, histórias e progressão', cor: '#ff7eb8' },
    { id: 'duelo', nome: '⚔️ Duelo de Saberes', desc: 'Desafios cronometrados', cor: '#ff6b6b' },
    { id: 'construcao', nome: '🏗️ Construa o Saber', desc: 'Montar, ordenar e classificar', cor: '#4ecdc4' },
    { id: 'memoria', nome: '🧠 Jogo da Memória', desc: 'Associe pares e conceitos', cor: '#a29bfe' },
    { id: 'desafio', nome: '🏆 Missão Especial', desc: 'Problemas práticos e projetos', cor: '#fdcb6e' },
    { id: 'aula_gravada', nome: '📹 Aula Gravada', desc: 'Assista quando quiser com material', cor: '#74b9ff' },
    { id: 'aula_ao_vivo', nome: '📺 Aula Ao Vivo', desc: 'Google Meet / Microsoft Teams com apresentação', cor: '#00b894' }
  ];

  // ============================================================
  // 🧠 METODOLOGIAS DE APRENDIZAGEM
  // ============================================================
  const metodologias = {
    visual: 'Aprendizagem Visual: diagramas, infográficos, mapas mentais, cores e esquemas',
    auditivo: 'Aprendizagem Auditiva: explicações orais, debates, podcasts, músicas e gravações',
    cinestesico: 'Aprendizagem Cinestésica: experimentos, jogos, movimento, projetos práticos',
    leitura: 'Aprendizagem por Leitura/Escrita: resumos, fichas, anotações, redações e pesquisa'
  };

  // ============================================================
  // 📖 BANCO DE CONTEÚDO POR TIPO DE JOGO
  // ============================================================
  const bancoConteudo = {
    alfabetizacao: {
      portugues: {
        quiz: [
          { pergunta: 'Qual letra inicia a palavra "CASA"?', opcoes: ['S', 'C', 'A', 'M'], correta: 1, explicacao: 'C-A-S-A → começa com C! 🏠' },
          { pergunta: 'Qual destas é uma vogal?', opcoes: ['B', 'E', 'D', 'F'], correta: 1, explicacao: 'A, E, I, O, U são vogais! ✨' },
          { pergunta: 'Quantas sílabas tem "BOLA"?', opcoes: ['1', '2', '3', '4'], correta: 1, explicacao: 'BO-LA → 2 sílabas! ⚽' }
        ],
        memoria: [
          { parA: 'A', parB: 'Maçã', dica: 'A de...' },
          { parA: 'E', parB: 'Elefante', dica: 'E de...' },
          { parA: 'O', parB: 'Ovelha', dica: 'O de...' },
          { parA: 'I', parB: 'Índio', dica: 'I de...' }
        ],
        construcao: [
          { instrucao: 'Ordene as sílabas para formar a palavra:', blocos: ['CA', 'SA'], resposta: ['CA', 'SA'], correta: 'CASA' }
        ],
        aventura: {
          historia: 'Você entrou na Floresta das Letras! 🌲 Para avançar, precisa decifrar as palavras escondidas...',
          fases: [
            { enunciado: 'Complete: C _ S A', opcoes: ['O', 'A', 'E'], resposta: 1, recompensa: '🏠' },
            { enunciado: 'Qual é a palavra? B O L _', opcoes: ['A', 'E', 'I'], resposta: 0, recompensa: '⚽' }
          ]
        },
        aula_gravada: {
          titulo: 'Introdução à Leitura e Escrita',
          duracao: '15 min',
          descricao: 'Aprenda as letras, os sons e como juntá-las para formar palavras. Material em PDF para acompanhar!',
          material: 'Caderno de exercícios, cartas de alfabeto, folha de caligrafia',
          link: '▶️ Reproduzir aula'
        },
        aula_ao_vivo: {
          titulo: 'Alfabetização — Turma Ao Vivo',
          dias: 'Segunda e Quarta',
          horario: '14h às 14h45',
          plataformas: [
            { nome: 'Google Meet', link: '🔗 Entrar na sala Meet' },
            { nome: 'Microsoft Teams', link: '🔗 Entrar na sala Teams' }
          ],
          materiais: ['Apresentação de slides', 'Quadro interativo', 'Lista de presença', 'Atividade em grupo']
        }
      },
      matematica: {
        quiz: [
          { pergunta: 'Quanto é 2 + 3?', opcoes: ['4', '5', '6', '7'], correta: 1, explicacao: '2 + 3 = 5! ✋' },
          { pergunta: 'Quantos lados tem um quadrado?', opcoes: ['3', '4', '5', '6'], correta: 1, explicacao: '4 lados iguais! ⬜' },
          { pergunta: 'Qual número vem depois de 9?', opcoes: ['8', '9', '10', '11'], correta: 2, explicacao: 'Contando: 8 → 9 → 10! 🔢' }
        ],
        memoria: [
          { parA: '3', parB: '🪑🪑🪑 3 cadeiras', dica: 'Quantos?' },
          { parA: '5', parB: '✋ 5 dedos', dica: 'A mão tem...' },
          { parA: '10', parB: '🔟 Duas mãos', dica: 'Conta até...' }
        ],
        construcao: [
          { instrucao: 'Ordene os números do menor para o maior:', blocos: ['5', '2', '8', '1'], resposta: ['1', '2', '5', '8'], correta: '1, 2, 5, 8' }
        ],
        duelo: [
          { pergunta: 'Quantos lados tem um triângulo?', tempo: 10, opcoes: ['2', '3', '4'], correta: 1 },
          { pergunta: 'Quanto é 4 + 4?', tempo: 8, opcoes: ['6', '7', '8'], correta: 2 },
          { pergunta: 'Metade de 10 é?', tempo: 12, opcoes: ['3', '5', '7'], correta: 1 }
        ],
        aula_gravada: {
          titulo: 'Números, Formas e Contagem',
          duracao: '18 min',
          descricao: 'Do 1 ao 20, formas geométricas e primeiros cálculos. Exercícios práticos ao final!',
          material: 'Cartões numéricos, figuras geométricas, folha de contagem',
          link: '▶️ Reproduzir aula'
        },
        aula_ao_vivo: {
          titulo: 'Matemática — Turma Ao Vivo',
          dias: 'Terça e Quinta',
          horario: '10h às 10h45',
          plataformas: [
            { nome: 'Google Meet', link: '🔗 Entrar na sala Meet' },
            { nome: 'Microsoft Teams', link: '🔗 Entrar na sala Teams' }
          ],
          materiais: ['Apresentação com imagens', 'Jogos interativos em tempo real', 'Correção de tarefas']
        }
      }
    },
    fundamental1: {
      matematica: {
        quiz: [
          { pergunta: 'Quanto é 25 + 17?', opcoes: ['32', '41', '42', '52'], correta: 2, explicacao: '25 + 17 = 42! ✅' },
          { pergunta: 'Metade de 100 é:', opcoes: ['25', '50', '75', '200'], correta: 1, explicacao: '100 ÷ 2 = 50! ⚖️' },
          { pergunta: 'Um triângulo tem quantos lados?', opcoes: ['2', '3', '4', '5'], correta: 1, explicacao: '3 lados, 3 vértices! 🔺' }
        ],
        construcao: [
          { instrucao: 'Complete a sequência:', blocos: ['10', '20', '?', '40', '?'], resposta: ['30', '50'], correta: '30, 50' }
        ],
        desafio: [
          { titulo: 'Problema da Feira', enunciado: 'Maria comprou 12 laranjas e deu 4 para sua irmã. Quantas sobraram?', passos: ['Subtrair 4 de 12', '12 - 4 = 8'], resposta: '8 laranjas', dica: 'Diminua o que foi dado!' }
        ],
        aula_gravada: {
          titulo: 'Operações, Frações e Medidas',
          duracao: '25 min',
          descricao: 'Adição, subtração, multiplicação e divisão; introdução a frações e sistema de medidas.',
          material: 'Quadro de valores, régua virtual, exercícios de frações para imprimir',
          link: '▶️ Reproduzir aula'
        },
        aula_ao_vivo: {
          titulo: 'Matemática — Fundamental I',
          dias: 'Segunda, Quarta e Sexta',
          horario: '09h às 10h',
          plataformas: [
            { nome: 'Google Meet', link: '🔗 Entrar na sala Meet' },
            { nome: 'Microsoft Teams', link: '🔗 Entrar na sala Teams' }
          ],
          materiais: ['Apresentação passo a passo', 'Resolução coletiva de exercícios', 'Plantão de dúvidas']
        }
      }
    },
    fundamental2: {
      matematica: {
        quiz: [
          { pergunta: 'Quanto é 7 × 8?', opcoes: ['54', '56', '63', '49'], correta: 1, explicacao: '7 × 8 = 56! Tabuada em dia! 🎯' },
          { pergunta: 'Soma dos ângulos internos de um triângulo:', opcoes: ['90°', '180°', '270°', '360°'], correta: 1, explicacao: 'Sempre 180°, qualquer triângulo! 🔺' },
          { pergunta: 'Qual é o valor de x em 2x = 12?', opcoes: ['4', '5', '6', '12'], correta: 2, explicacao: 'x = 12 ÷ 2 = 6! Álgebra básica! ⚖️' }
        ],
        construcao: [
          { instrucao: 'Ordene as etapas para resolver a equação: 3x + 5 = 20', blocos: ['Subtrair 5', 'Dividir por 3', 'Resultado x = 5'], resposta: ['Subtrair 5', 'Dividir por 3', 'Resultado x = 5'], correta: 'x = 5' }
        ],
        duelo: [
          { pergunta: 'Raiz quadrada de 36?', tempo: 8, opcoes: ['5', '6', '7', '8'], correta: 1 },
          { pergunta: '0,5 em fração é?', tempo: 10, opcoes: ['1/3', '1/2', '1/4', '2/5'], correta: 1 },
          { pergunta: 'Triângulo com todos os lados iguais é?', tempo: 12, opcoes: ['Retângulo', 'Equilátero', 'Isósceles'], correta: 1 }
        ],
        aula_gravada: {
          titulo: 'Álgebra, Geometria e Estatística',
          duracao: '32 min',
          descricao: 'Equações, funções, triângulos, teorema de Pitágoras e introdução à estatística.',
          material: 'Fórmulas em resumo, figuras geométricas, exercícios de vestibular',
          link: '▶️ Reproduzir aula'
        },
        aula_ao_vivo: {
          titulo: 'Matemática — Fundamental II',
          dias: 'Terça e Quinta',
          horario: '15h às 16h',
          plataformas: [
            { nome: 'Google Meet', link: '🔗 Entrar na sala Meet' },
            { nome: 'Microsoft Teams', link: '🔗 Entrar na sala Teams' }
          ],
          materiais: ['Apresentação com gráficos', 'Resolução em tempo real', 'Atividade colaborativa', 'Lista de exercícios']
        }
      }
    },
    medio: {
      matematica: {
        quiz: [
          { pergunta: 'A raiz quadrada de 144 é:', opcoes: ['10', '11', '12', '14'], correta: 2, explicacao: '12 × 12 = 144 → √144 = 12 ✅' },
          { pergunta: 'Se sen(x) = 0,5 então x = ?', opcoes: ['30°', '45°', '60°', '90°'], correta: 0, explicacao: 'sen(30°) = 1/2 — trigonometria! 📐' },
          { pergunta: 'O produto das raízes de x² - 5x + 6 = 0 é:', opcoes: ['-5', '5', '-6', '6'], correta: 3, explicacao: 'Produto = c/a = 6/1 = 6 — fórmula de Bhaskara! 📝' }
        ],
        construcao: [
          { instrucao: 'Monte a fórmula da área do círculo:', blocos: ['π', '×', 'r²'], resposta: ['π', '×', 'r²'], correta: 'A = πr²' }
        ],
        desafio: [
          { titulo: 'Problema de Otimização', enunciado: 'Um terreno retangular tem perímetro de 60m. Qual a largura que maximiza a área?', passos: ['Definir variáveis', 'Montar função quadrática', 'Encontrar vértice'], resposta: '15m', dica: 'O máximo da parábola está no vértice!' }
        ],
        aula_gravada: {
          titulo: 'Funções, Trigonometria e Matemática Financeira',
          duracao: '45 min',
          descricao: 'Funções do 1º e 2º grau, triângulos retângulos, juros simples e compostos + exercícios de vestibular.',
          material: 'Fichas de fórmulas, tabela de razões trigonométricas, simulado comentado',
          link: '▶️ Reproduzir aula'
        },
        aula_ao_vivo: {
          titulo: 'Matemática — Ensino Médio / Preparação Vestibular',
          dias: 'Segunda, Quarta e Sexta',
          horario: '19h às 20h30',
          plataformas: [
            { nome: 'Google Meet', link: '🔗 Entrar na sala Meet' },
            { nome: 'Microsoft Teams', link: '🔗 Entrar na sala Teams' }
          ],
          materiais: ['Apresentação em slides', 'Resolução de provas anteriores', 'Simulados em grupo', 'Plantão de dúvidas individual']
        }
      },
      fisica: {
        quiz: [
          { pergunta: 'A aceleração da gravidade na Terra é aproximadamente:', opcoes: ['5 m/s²', '9,8 m/s²', '15 m/s²', '20 m/s²'], correta: 1, explicacao: 'g ≈ 9,8 m/s²! Força da gravidade! 🌍' },
          { pergunta: 'Um corpo em queda livre converte energia:', opcoes: ['Elástica → Cinética', 'Potencial → Cinética', 'Química → Térmica', 'Nuclear → Elétrica'], correta: 1, explicacao: 'Energia potencial vira movimento! ⬇️⚡' }
        ],
        aula_gravada: {
          titulo: 'Mecânica e Leis de Newton',
          duracao: '40 min',
          descricao: 'Movimento, forças, trabalho e energia. Exemplos do dia a dia!',
          material: 'Resumo de fórmulas, esquemas de forças, exercícios com resolução',
          link: '▶️ Reproduzir aula'
        },
        aula_ao_vivo: {
          titulo: 'Física — Ensino Médio',
          dias: 'Terça e Quinta',
          horario: '17h às 18h30',
          plataformas: [
            { nome: 'Google Meet', link: '🔗 Entrar na sala Meet' },
            { nome: 'Microsoft Teams', link: '🔗 Entrar na sala Teams' }
          ],
          materiais: ['Simulações interativas', 'Gráficos e diagramas', 'Resolução passo a passo']
        }
      }
    }
  };

  // ============================================================
  // 🧠 DIAGNÓSTICO COGNITIVO
  // ============================================================
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
  const conteudo = bancoConteudo[ciclo]?.[materia];
  const dadosAtividade = conteudo?.[tipoAtividade];

  // ============================================================
  // 🏆 SISTEMA DE RECOMPENSAS
  // ============================================================
  const verificarInsignias = () => {
    const novas = [];
    if (pontos >= 100 && !insignias.includes('estrela')) novas.push('⭐ Estrela do Conhecimento');
    if (pontos >= 500 && !insignias.includes('sabio')) novas.push('🦉 Sábio do Saber');
    if (pontos >= 1000 && !insignias.includes('mestre')) novas.push('👑 Mestre da Educação');
    if (novas.length > 0) setInsignias(prev => [...prev, ...novas]);
  };

  useEffect(() => { verificarInsignias(); }, [pontos]);

  // ============================================================
  // 🎯 RESPOSTAS E NAVEGAÇÃO
  // ============================================================
  const responder = (indice) => {
    setRespostaSelecionada(indice);
    if (dadosAtividade && dadosAtividade[perguntaAtual]) {
      const pergunta = dadosAtividade[perguntaAtual];
      if (indice === pergunta.correta) {
        setPontos(prev => prev + 10 * nivel);
        setTimeout(() => {
          if (perguntaAtual + 1 >= dadosAtividade.length) {
            setEtapa('concluido');
          } else {
            setPerguntaAtual(prev => prev + 1);
            setRespostaSelecionada(null);
          }
        }, 1500);
      } else {
        setTimeout(() => setRespostaSelecionada(null), 1500);
      }
    }
  };

  const reiniciar = () => {
    setEtapa('inicio');
    setPerguntaAtual(0);
    setRespostaSelecionada(null);
    setDiagnostico({ visual: 0, auditivo: 0, cinestesico: 0, leitura: 0 });
    setCiclo(null);
    setMateria(null);
    setTipoAtividade(null);
    setModoJogo(null);
  };

  // ============================================================
  // 🎨 ESTILOS
  // ============================================================
  const estiloBotao = (corAtiva = null) => ({
    padding: '1.2rem 1.5rem', borderRadius: '0.9rem', border: 'none',
    background: corAtiva || 'rgba(255,255,255,0.06)', color: 'white', textAlign: 'left',
    cursor: 'pointer', transition: 'all 0.3s ease', width: '100%', fontSize: '1rem'
  });

  // ============================================================
  // 🖥️ INTERFACE PRINCIPAL
  // ============================================================
  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      color: 'white', fontFamily: 'system-ui, sans-serif'
    }}>
      <header style={{
        padding: '1.2rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <h1 style={{
          fontSize: '1.5rem', fontWeight: 'bold', margin: 0,
          background: 'linear-gradient(90deg, #f093fb, #f5576a, #ffd89b)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>🎮 EducaGam — BNCC • Currículo Paulista • LDB</h1>
        {etapa !== 'inicio' && (
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            {infoCiclo && (
              <span style={{
                background: `${infoCiclo.cor}22`, padding: '0.4rem 0.8rem', borderRadius: '1rem',
                fontSize: '0.8rem', border: `1px solid ${infoCiclo.cor}44`
              }}>{infoCiclo.nome.split(' ')[0]}</span>
            )}
            {infoMateria && (
              <span style={{ fontSize: '0.85rem', color: '#ffd89b' }}>{infoMateria.nome}</span>
            )}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Nível</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ffd700' }}>🏅{nivel}</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>Pontos</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#7fff7f' }}>{pontos}</div>
            </div>
            {insignias.length > 0 && (
              <div style={{ fontSize: '0.9rem' }}>{insignias.join(' ')}</div>
            )}
            <button onClick={reiniciar} style={{
              padding: '0.5rem 1rem', borderRadius: '2rem', border: 'none',
              background: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', fontSize: '0.85rem'
            }}>🔄 Início</button>
          </div>
        )}
      </header>

      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem',
        opacity: animarEntrada ? 1 : 0, transform: animarEntrada ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease-out'
      }}>

        {/* ============================================== */}
        {/* ETAPA 1 — INÍCIO */}
        {/* ============================================== */}
        {etapa === 'inicio' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4.5rem', marginBottom: '1rem' }}>🚀🌟📚✨</div>
            <h2 style={{ fontSize: '2.3rem', marginBottom: '1rem' }}>Bem-vindo ao EducaGam!</h2>
            <p style={{ fontSize: '1.1rem', color: '#d0d0d0', marginBottom: '1rem' }}>
              A plataforma educacional mais completa do Brasil 🇧🇷
            </p>
            <p style={{ fontSize: '0.95rem', color: '#aaa', marginBottom: '2rem' }}>
              Alinhada à <strong>BNCC</strong>, <strong>Currículo Paulista</strong> e <strong>LDB 9.394/96</strong><br/>
              Da Alfabetização ao Ensino Médio + Preparação para Vestibular e Concursos
            </p>
            
            <div style={{
              background: 'rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '2rem',
              marginBottom: '2rem', border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <label style={{ display: 'block', marginBottom: '0.8rem', fontSize: '1.1rem' }}>
                Qual é o seu nome?
              </label>
              <input type="text" placeholder="Digite seu nome..." value={nome}
                onChange={(e) => setNome(e.target.value)} style={{
                  width: '100%', padding: '1rem 1.3rem', fontSize: '1.1rem', borderRadius: '0.8rem',
                  border: '2px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.2)',
                  color: 'white', outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#f093fb'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { icone: '🎮', titulo: '7 Tipos de Jogos', desc: 'Quiz, Aventura, Duelo, Memória e mais' },
                { icone: '📹', titulo: 'Aulas Gravadas', desc: 'Assista no seu ritmo com material' },
                { icone: '📺', titulo: 'Ao Vivo', desc: 'Google Meet e Microsoft Teams' },
                { icone: '🧠', titulo: 'Perfil Cognitivo', desc: 'Conteúdo adaptado ao seu jeito de aprender' }
              ].map((item, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.05)', padding: '1.2rem', borderRadius: '1rem',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}>
                  <div style={{ fontSize: '2rem' }}>{item.icone}</div>
                  <div style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>{item.titulo}</div>
                  <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            <button onClick={() => nome.trim() && setEtapa('escolhaCiclo')} disabled={!nome.trim()} style={{
              padding: '1.1rem 3rem', fontSize: '1.15rem', fontWeight: 'bold', borderRadius: '3rem', border: 'none',
              background: nome.trim() ? 'linear-gradient(90deg, #f093fb, #f5576a)' : '#444',
              color: 'white', cursor: nome.trim() ? 'pointer' : 'not-allowed',
              boxShadow: nome.trim() ? '0 4px 25px rgba(240,147,251,0.4)' : 'none'
            }}>🚀 Começar Minha Jornada →</button>
          </div>
        )}

        {/* ============================================== */}
        {/* ETAPA 2 — ESCOLHA DE CICLO */}
        {/* ============================================== */}
        {etapa === 'escolhaCiclo' && (
          <div>
            <h3 style={{ textAlign: 'center', fontSize: '1.9rem', marginBottom: '0.5rem' }}>
              Olá, {nome}! Vamos escolher seu nível 📚
            </h3>
            <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '2rem' }}>
              Conteúdo alinhado à BNCC, Currículo Paulista e LDB 🇧🇷
            </p>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {ciclos.map(c => (
                <button key={c.id} onClick={() => { setCiclo(c.id); setEtapa('diagnostico'); }} style={{
                  ...estiloBotao(),
                  borderLeft: `5px solid ${c.cor}`, padding: '1.6rem 2rem'
                }}
                  onMouseOver={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.12)';
                    e.target.style.transform = 'translateX(
