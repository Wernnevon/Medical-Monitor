import type { IconName } from '@app/shared/components/icon/icons';
import { COUNCIL_EXAM_PERMISSIONS } from './exam-council-permissions';
import type { Denticao } from '@app/shared/components/odontogram/odontogram';

/**
 * Catálogo de exames oferecido como checklist na tela de solicitação. O que
 * cada profissional pode solicitar depende do conselho de classe dele — os
 * dados ficam em `exam-council-permissions.ts`; aqui só viram categorias
 * prontas pra tela (nome legível e ícone). Dado de referência da clínica,
 * não do domínio, então vive aqui e não em `domain/`.
 */
export type CategoriaExame = {
  tipo: string;
  icone: IconName;
  exames: string[];
};

export type CatalogoDoConselho = {
  categorias: CategoriaExame[];
  /** Presente só quando o conselho não solicita exames clínicos (CRP, CRESS). */
  aviso: string | null;
};

const MINUSCULAS = new Set(['e', 'de', 'da', 'do', 'das', 'dos']);

/** "HORMÔNIOS E MARCADORES" → "Hormônios e Marcadores"; o que vem entre
 *  parênteses já está em caixa normal e fica como está. */
function nomeLegivel(categoria: string): string {
  const [principal, ...resto] = categoria.split(' (');
  const titulo = principal
    .toLowerCase()
    .split(' ')
    .map((p, i) => (i > 0 && MINUSCULAS.has(p) ? p : p.charAt(0).toUpperCase() + p.slice(1)))
    .join(' ');
  return resto.length ? `${titulo} (${resto.join(' (')}` : titulo;
}

const ICONES_POR_TERMO: [string, IconName][] = [
  ['imagem', 'LuScan'],
  ['odonto', 'LuSmile'],
  ['histopatologia', 'LuMicroscope'],
  ['microbiologia', 'LuMicroscope'],
  ['genética', 'LuDna'],
  ['hematologia', 'LuDroplet'],
  ['ferro', 'LuDroplet'],
  ['hormôn', 'LuActivity'],
  ['dinâmicos', 'LuActivity'],
  ['lipíd', 'LuHeartPulse'],
  ['cardiovascular', 'LuHeartPulse'],
  ['imunologia', 'LuShieldCheck'],
  ['sorologia', 'LuShieldCheck'],
  ['urinálise', 'LuTestTube'],
  ['tumorais', 'LuTarget'],
  ['vitamin', 'HiOutlineSun'],
  ['avalia', 'LuClipboardList'],
  ['documenta', 'LuClipboardList'],
  ['bioquímica', 'LuFlaskConical'],
];

function iconeDaCategoria(categoria: string): IconName {
  const minusculo = categoria.toLowerCase();
  return ICONES_POR_TERMO.find(([termo]) => minusculo.includes(termo))?.[1] ?? 'LuFlaskConical';
}

export function catalogoDoConselho(conselho: string | undefined): CatalogoDoConselho {
  const permissao = COUNCIL_EXAM_PERMISSIONS.find((p) => p.council === conselho);
  if (!permissao) return { categorias: [], aviso: null };
  return {
    categorias: permissao.categories.map((c) => ({
      tipo: nomeLegivel(c.category),
      icone: iconeDaCategoria(c.category),
      exames: c.exams,
    })),
    aviso: permissao.canRequestMedicalExams ? null : permissao.notes,
  };
}

/** Os odontogramas do catálogo não são um exame comum: um por requisição,
 *  e marcá-lo abre a grade de dentes na dentição correspondente. */
export function denticaoDoOdontograma(nome: string): Denticao | null {
  if (!nome.startsWith('Odontograma')) return null;
  if (nome.includes('Decídua')) return 'decidua';
  if (nome.includes('Misto')) return 'mista';
  return 'permanente';
}
