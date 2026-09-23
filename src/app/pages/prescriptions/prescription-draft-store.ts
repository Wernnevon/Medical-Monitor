import { Service } from '@angular/core';
import type { MedicationDraft } from './prescription-draft';

export type SavedDraft = {
  medicamentos: MedicationDraft[];
  orientacoesGerais: string;
  updatedAt: string;
};

const PREFIXO = 'vittaly:receita-rascunho:';

/**
 * Rascunho de receita, um por paciente, guardado no próprio navegador.
 * `Prescription` não tem estado de rascunho — gravar ali faria o rascunho
 * aparecer no histórico do paciente como se já tivesse sido prescrito, e
 * emitir depois duplicaria os registros.
 */
@Service()
export class PrescriptionDraftStore {
  load(patientId: string): SavedDraft | null {
    try {
      const bruto = localStorage.getItem(PREFIXO + patientId);
      return bruto ? (JSON.parse(bruto) as SavedDraft) : null;
    } catch {
      return null;
    }
  }

  save(patientId: string, draft: Omit<SavedDraft, 'updatedAt'>): boolean {
    try {
      const salvo: SavedDraft = { ...draft, updatedAt: new Date().toISOString() };
      localStorage.setItem(PREFIXO + patientId, JSON.stringify(salvo));
      return true;
    } catch {
      return false;
    }
  }

  clear(patientId: string): void {
    try {
      localStorage.removeItem(PREFIXO + patientId);
    } catch {
      // Sem storage disponível não há rascunho pra limpar.
    }
  }
}
