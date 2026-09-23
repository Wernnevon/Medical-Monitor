/**
 * Um medicamento da receita em edição. Todos os campos são texto livre: não
 * existe base de medicamentos gratuita que cubra tudo o que pode ser
 * prescrito, então as sugestões (`SUGESTOES`) só ajudam a digitar — nunca
 * restringem o que pode ser escrito.
 */
export type MedicationDraft = {
  key: string;
  name: string;
  presentation: string;
  dose: string;
  frequency: string;
  route: string;
  duration: string;
  quantity: string;
  instructions: string;
};

export type MedicationField = Exclude<keyof MedicationDraft, 'key'>;

export type PrescriptionState = 'RASCUNHO' | 'EMITIDA';

export const LIMITE_ORIENTACOES_ITEM = 200;
export const LIMITE_ORIENTACOES_GERAIS = 500;

export const SUGESTOES = {
  presentation: ['Comprimido', 'Cápsula', 'Solução oral', 'Suspensão oral', 'Gotas', 'Xarope', 'Pomada', 'Creme', 'Injetável', 'Spray'],
  frequency: ['a cada 4 horas', 'a cada 6 horas', 'a cada 8 horas', 'a cada 12 horas', '1 vez ao dia', 'se necessário'],
  route: ['Via oral', 'Via sublingual', 'Via tópica', 'Via intramuscular', 'Via intravenosa', 'Via inalatória', 'Via nasal', 'Via oftálmica'],
  duration: ['3 dias', '5 dias', '7 dias', '10 dias', '14 dias', 'Uso contínuo'],
} as const;

export function medicamentoVazio(key: string): MedicationDraft {
  return {
    key,
    name: '',
    presentation: '',
    dose: '',
    frequency: '',
    route: '',
    duration: '',
    quantity: '',
    instructions: '',
  };
}

/** "Comprimido · 1 caixa (6 comprimidos)" — subtítulo do card e da prévia. */
export function resumo(item: MedicationDraft): string {
  return [item.presentation.trim(), item.quantity.trim()].filter(Boolean).join(' · ');
}

/**
 * "Tomar 1 comprimido por via oral, a cada 6 horas, por 3 dias." — montada
 * a partir do que tiver sido digitado, sem exigir nenhum campo além da dose
 * e da frequência. Se a frequência já vier como frase completa, fica como
 * está: o profissional pode escrever a posologia inteira ali.
 */
export function posologia(item: MedicationDraft): string {
  const dose = item.dose.trim();
  const via = item.route.trim();
  const frequencia = item.frequency.trim();
  const duracao = item.duration.trim();

  let frase = dose ? `Tomar ${dose}` : '';
  if (via) frase += `${frase ? ' por ' : ''}${via.toLowerCase()}`;
  if (frequencia) frase += `${frase ? ', ' : ''}${frequencia}`;
  if (duracao) frase += `${frase ? ', ' : ''}${/^\d/.test(duracao) ? `por ${duracao}` : duracao.toLowerCase()}`;
  if (!frase) return '';
  frase = frase.charAt(0).toUpperCase() + frase.slice(1);
  return /[.!?]$/.test(frase) ? frase : `${frase}.`;
}

export function itemCompleto(item: MedicationDraft): boolean {
  return !!item.name.trim() && !!item.dose.trim() && !!item.frequency.trim();
}

/** `Prescription` só tem `medicament` (string): a estrutura do item é
 *  achatada aqui pra não se perder na hora de persistir. */
export function formatarParaPersistir(item: MedicationDraft): string {
  return [item.name.trim(), resumo(item), posologia(item), item.instructions.trim()]
    .filter(Boolean)
    .join(' — ');
}
