import { Service } from '@angular/core';
import type { ExamDraftState } from './exam-draft';

export type SavedExamDraft = ExamDraftState & { updatedAt: string };

const PREFIXO = 'vittaly:exame-rascunho:';

/**
 * Rascunho de solicitação de exames, um por paciente, guardado no próprio
 * navegador. Mesmo racional do `PrescriptionDraftStore`: `Exam` não tem
 * estado de rascunho, então gravar ali faria a seleção aparecer no
 * histórico do paciente antes de ser emitida.
 */
@Service()
export class ExamDraftStore {
  load(patientId: string): SavedExamDraft | null {
    try {
      const bruto = localStorage.getItem(PREFIXO + patientId);
      return bruto ? (JSON.parse(bruto) as SavedExamDraft) : null;
    } catch {
      return null;
    }
  }

  save(patientId: string, draft: ExamDraftState): boolean {
    try {
      const salvo: SavedExamDraft = { ...draft, updatedAt: new Date().toISOString() };
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
