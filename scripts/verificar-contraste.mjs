/**
 * Valida os pares de cor da paleta contra os mínimos da WCAG 2.1 AA.
 *
 * Rode com `npm run contraste` depois de mexer em `src/styles/_tokens.scss`.
 * Contraste é fácil de quebrar sem perceber — um tom clareado "só um
 * pouquinho" para ficar mais bonito derruba a legibilidade de quem tem baixa
 * visão, e nada na tela avisa.
 *
 * Os valores aqui espelham os tokens; mantenha os dois em sincronia.
 */
const hex = (h) => h.replace('#', '').match(/../g).map((x) => parseInt(x, 16));

function luminancia(h) {
  const [r, g, b] = hex(h).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const razao = (a, b) => {
  const [x, y] = [luminancia(a), luminancia(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

// Escala derivada de #071C55 (matiz ~224°), do mais claro ao mais escuro.
const AZUL = {
  50: '#F2F5FC',
  100: '#E1E8F7',
  200: '#C2CFEE',
  300: '#93A9DC',
  400: '#5F7CC3',
  500: '#3A57A8',
  600: '#27418C',
  700: '#1A2F73',
  800: '#0F2364',
  900: '#071C55',
};

const NEUTRO = {
  fundo: '#F4F6FA',
  superficie: '#FEFEFE',
  superficieAlt: '#F7F9FC',
  borda: '#DCE3EF',
  bordaForte: '#7F8FB0',
  texto: '#0E1B33',
  textoSuave: '#4A5875',
  textoFraco: '#667391',
};

const ESTADO = {
  erro: '#C02616',
  erroFundo: '#FDE4E0',
  sucesso: '#16794A',
  sucessoFundo: '#D6F2E2',
  alerta: '#8A5A00',
  alertaFundo: '#FDEFD0',
};

const pares = [
  ['texto sobre superfície', NEUTRO.texto, NEUTRO.superficie, 4.5],
  ['texto suave sobre superfície', NEUTRO.textoSuave, NEUTRO.superficie, 4.5],
  ['texto fraco sobre superfície', NEUTRO.textoFraco, NEUTRO.superficie, 4.5],
  ['texto sobre fundo do app', NEUTRO.texto, NEUTRO.fundo, 4.5],
  ['texto sobre linha alternada', NEUTRO.texto, NEUTRO.superficieAlt, 4.5],
  ['branco sobre menu (azul 900)', '#FEFEFE', AZUL[900], 4.5],
  ['branco sobre item ativo (azul 700)', '#FEFEFE', AZUL[700], 4.5],
  ['branco sobre botão primário (azul 600)', '#FEFEFE', AZUL[600], 4.5],
  ['branco sobre botão hover (azul 700)', '#FEFEFE', AZUL[700], 4.5],
  ['azul 600 sobre superfície (link)', AZUL[600], NEUTRO.superficie, 4.5],
  ['azul 700 sobre azul 50 (chip)', AZUL[700], AZUL[50], 4.5],
  ['borda forte sobre superfície', NEUTRO.bordaForte, NEUTRO.superficie, 3],
  ['anel de foco sobre superfície', AZUL[600], NEUTRO.superficie, 3],
  ['anel de foco sobre menu', '#FEFEFE', AZUL[900], 3],
  ['erro sobre fundo de erro', ESTADO.erro, ESTADO.erroFundo, 4.5],
  ['sucesso sobre fundo de sucesso', ESTADO.sucesso, ESTADO.sucessoFundo, 4.5],
  ['alerta sobre fundo de alerta', ESTADO.alerta, ESTADO.alertaFundo, 4.5],
  ['erro sobre superfície', ESTADO.erro, NEUTRO.superficie, 4.5],
];

let falhas = 0;
for (const [nome, fg, bg, min] of pares) {
  const r = razao(fg, bg);
  const ok = r >= min;
  if (!ok) falhas++;
  console.log(
    `${ok ? 'PASS' : 'FALHA'}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${nome}`,
  );
}
console.log(falhas === 0 ? '\nTODOS OS PARES ATENDEM A WCAG AA' : `\n${falhas} PAR(ES) ABAIXO DO MÍNIMO`);
process.exit(falhas ? 1 : 0);
