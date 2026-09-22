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

const PRIMARIA = { base: '#071C55', escura: '#04143D', clara: '#102E78' };
const ACENTO = { base: '#CBB590', clara: '#E4D8C2', escura: '#A68F67' };
const NEUTRO = {
  fundo: '#F8F8F6',
  superficie: '#FFFFFF',
  texto: '#1C2430',
  textoSuave: '#667085',
  borda: '#E4E7EC',
  bordaForte: '#7C89A0',
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
  ['texto sobre fundo do app', NEUTRO.texto, NEUTRO.fundo, 4.5],
  ['texto suave sobre superfície', NEUTRO.textoSuave, NEUTRO.superficie, 4.5],
  ['branco sobre primária (menu/botão)', '#FEFEFE', PRIMARIA.base, 4.5],
  ['branco sobre primária escura (hover)', '#FEFEFE', PRIMARIA.escura, 4.5],
  ['primária sobre superfície (link)', PRIMARIA.base, NEUTRO.superficie, 4.5],
  ['texto sobre acento claro (badge premium)', NEUTRO.texto, ACENTO.clara, 4.5],
  ['primária sobre acento claro (badge premium)', PRIMARIA.base, ACENTO.clara, 4.5],
  // O dourado é decorativo: só precisa passar como ícone/divisor (3:1), e só
  // sobre o navy do menu — nunca como texto ou fundo de botão sobre claro.
  ['acento sobre primária (ícone/detalhe no menu)', ACENTO.base, PRIMARIA.base, 3],
  ['acento claro sobre primária (destaque no menu)', ACENTO.clara, PRIMARIA.base, 3],
  ['borda forte sobre superfície', NEUTRO.bordaForte, NEUTRO.superficie, 3],
  ['anel de foco (primária) sobre superfície', PRIMARIA.base, NEUTRO.superficie, 3],
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
console.log(
  falhas === 0
    ? '\nTODOS OS PARES ATENDEM A WCAG AA'
    : `\n${falhas} PAR(ES) ABAIXO DO MÍNIMO`,
);
process.exit(falhas ? 1 : 0);
