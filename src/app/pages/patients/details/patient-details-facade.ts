import { Service, inject, resource, signal } from '@angular/core';
import {
  ExamListPagination,
  PatientFindById,
  PrescriptionListPagination,
} from '@domain/tokens';

/**
 * Estado da página de Detalhes do Paciente: o paciente em si e a linha do
 * tempo mesclada de exames e receitas vinculadas a ele.
 *
 * Reaproveita `ExamListPagination`/`PrescriptionListPagination` — os mesmos
 * tokens que a listagem geral de exames/receitas vai usar quando essas
 * telas existirem — filtrando por `patientId`. Não foi preciso nenhum
 * contrato novo no domínio: `paginateStore` já suporta filtro indexado por
 * paciente desde a Fase 1.
 */
@Service()
export class PatientDetailsFacade {
  private readonly findPatient = inject(PatientFindById);
  private readonly examUseCase = inject(ExamListPagination);
  private readonly prescriptionUseCase = inject(PrescriptionListPagination);

  readonly patientId = signal('');

  private readonly patientResource = resource({
    params: () => ({ id: this.patientId() }),
    loader: ({ params }) =>
      params.id ? this.findPatient.findById({ id: params.id }) : Promise.resolve(undefined),
  });

  readonly patient = this.patientResource.value;
  readonly loadingPatient = this.patientResource.isLoading;
  readonly patientError = this.patientResource.error;

  /** Linha do tempo unificada: exames e receitas ordenados por data, mais
   *  recente primeiro. É a única listagem de exames/receitas da página —
   *  busca até 200 de cada, sem paginação própria, como visão consolidada. */
  private readonly historicoResource = resource({
    params: () => ({ id: this.patientId() }),
    loader: async ({ params }) => {
      if (!params.id) return [];
      const filtro = [{ key: 'patientId', value: params.id }];
      const [exames, receitas] = await Promise.all([
        this.examUseCase.listPagination({ page: 1, pageSize: 200, filters: filtro }),
        this.prescriptionUseCase.listPagination({ page: 1, pageSize: 200, filters: filtro }),
      ]);
      const linhaDoTempo = [
        ...exames.entries.map((e: any) => ({
          id: e.id,
          tipo: 'exame' as const,
          titulo: e.name,
          data: e.requisitionDate,
          status: e.status,
        })),
        ...receitas.entries.map((r: any) => ({
          id: r.id,
          tipo: 'receita' as const,
          titulo: r.medicament,
          data: r.date,
          status: r.status,
        })),
      ];
      return linhaDoTempo.sort((a, b) => String(b.data).localeCompare(String(a.data)));
    },
    defaultValue: [],
  });

  readonly historico = this.historicoResource.value;

  /** Força releitura do paciente após uma escrita externa (ex.: salvar a
   *  anamnese), sem precisar recarregar o histórico junto. */
  reloadPatient(): void {
    this.patientResource.reload();
  }

  /** Força releitura do histórico após salvar uma anotação de exame. */
  reloadHistorico(): void {
    this.historicoResource.reload();
  }
}
