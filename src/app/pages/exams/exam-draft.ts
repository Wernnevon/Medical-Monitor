/**
 * Estado do rascunho de uma solicitação de exames em edição. Espelha
 * `prescription-draft.ts`, mas bem mais simples: não há campos por item, só
 * o que foi marcado no catálogo, os dentes do odontograma e o texto livre.
 */
export type ExamDraftState = {
  selecionados: string[];
  /** Nome do odontograma escolhido no catálogo, se houver. */
  odontograma: string | null;
  dentes: number[];
  outrosTexto: string;
};

export type ExamState = 'RASCUNHO' | 'EMITIDA';

export const LIMITE_OUTROS_EXAMES = 500;

export function rascunhoVazio(): ExamDraftState {
  return { selecionados: [], odontograma: null, dentes: [], outrosTexto: '' };
}
