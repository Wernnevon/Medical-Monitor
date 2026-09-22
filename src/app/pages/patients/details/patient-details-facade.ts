import { Service, computed, inject, resource, signal } from '@angular/core';
import type { ListPagination } from '@domain/use-cases';
import {
  ExamListPagination,
  PatientFindById,
  PrescriptionListPagination,
} from '@domain/tokens';

const PAGE_SIZE = 10;

/**
 * Estado da página de Detalhes do Paciente: o paciente em si e as listas
 * paginadas de exames e receitas vinculadas a ele.
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
  readonly examPage = signal(1);
  readonly prescriptionPage = signal(1);

  private readonly patientResource = resource({
    params: () => ({ id: this.patientId() }),
    loader: ({ params }) =>
      params.id ? this.findPatient.findById({ id: params.id }) : Promise.resolve(undefined),
  });

  readonly patient = this.patientResource.value;
  readonly loadingPatient = this.patientResource.isLoading;
  readonly patientError = this.patientResource.error;

  private readonly examsResource = resource({
    params: () => ({ id: this.patientId(), page: this.examPage() }),
    loader: ({ params }): Promise<ListPagination.Response<any>> =>
      params.id
        ? this.examUseCase.listPagination({
            page: params.page,
            pageSize: PAGE_SIZE,
            filters: [{ key: 'patientId', value: params.id }],
          })
        : Promise.resolve({ entries: [], totalEntries: 0 }),
    defaultValue: { entries: [], totalEntries: 0 },
  });

  private readonly prescriptionsResource = resource({
    params: () => ({ id: this.patientId(), page: this.prescriptionPage() }),
    loader: ({ params }): Promise<ListPagination.Response<any>> =>
      params.id
        ? this.prescriptionUseCase.listPagination({
            page: params.page,
            pageSize: PAGE_SIZE,
            filters: [{ key: 'patientId', value: params.id }],
          })
        : Promise.resolve({ entries: [], totalEntries: 0 }),
    defaultValue: { entries: [], totalEntries: 0 },
  });

  readonly exams = computed(() => this.examsResource.value().entries);
  readonly examsTotal = computed(() => this.examsResource.value().totalEntries);
  readonly examsTotalPages = computed(
    () => Math.ceil(this.examsTotal() / PAGE_SIZE) || 1,
  );

  readonly prescriptions = computed(() => this.prescriptionsResource.value().entries);
  readonly prescriptionsTotal = computed(
    () => this.prescriptionsResource.value().totalEntries,
  );
  readonly prescriptionsTotalPages = computed(
    () => Math.ceil(this.prescriptionsTotal() / PAGE_SIZE) || 1,
  );

  /** Linha do tempo unificada: exames e receitas ordenados por data, mais
   *  recente primeiro. Usada na aba Histórico. Busca até 200 de cada — não
   *  há paginação própria aqui, é uma visão consolidada. */
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
          tipo: 'exame' as const,
          titulo: e.name,
          data: e.requisitionDate,
          status: e.status,
        })),
        ...receitas.entries.map((r: any) => ({
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
}
