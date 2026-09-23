import { Service, computed, inject, resource, signal } from '@angular/core';
import type { Patient } from '@domain/entities';
import {
  PatientDelete,
  PatientListCities,
  PatientListInsurance,
  PatientListPagination,
} from '@domain/tokens';
import type { ListPagination } from '@domain/use-cases';

/**
 * Visão reativa do agregado Paciente.
 *
 * Os contratos do domínio são `Promise` e permanecem TypeScript puro — trazer
 * `resource()` para lá importaria `@angular/core` no núcleo e desfaria a
 * portabilidade que os tokens abstratos garantem. A reatividade é decisão de
 * quem consome, então mora aqui: a fachada envolve os casos de uso em
 * `resource()` e entrega signals prontos, e a página só lê e reage.
 */
@Service()
export class PatientsFacade {
  private readonly listUseCase = inject(PatientListPagination);
  private readonly deleteUseCase = inject(PatientDelete);
  private readonly citiesUseCase = inject(PatientListCities);
  private readonly insurancesUseCase = inject(PatientListInsurance);

  readonly page = signal(1);
  readonly pageSize = signal(10);
  readonly keywords = signal<string[]>([]);
  readonly filters = signal<ListPagination.Filter[]>([]);

  private readonly listing = resource({
    params: () => ({
      page: this.page(),
      pageSize: this.pageSize(),
      keywords: this.keywords(),
      filters: this.filters(),
    }),
    loader: ({ params }) => this.listUseCase.listPagination(params),
    defaultValue: { entries: [] as Patient[], totalEntries: 0 },
  });

  private readonly options = resource({
    loader: async () => ({
      cities: await this.citiesUseCase.listCities(),
      insurances: await this.insurancesUseCase.listInsurance(),
    }),
    defaultValue: { cities: [] as string[], insurances: [] as string[] },
  });

  readonly patients = computed(() => this.listing.value().entries);
  readonly totalEntries = computed(() => this.listing.value().totalEntries);
  readonly totalPages = computed(
    () => Math.ceil(this.totalEntries() / this.pageSize()) || 1,
  );
  readonly isLoading = this.listing.isLoading;
  readonly error = this.listing.error;

  readonly cities = computed(() => unique(this.options.value().cities));
  readonly insurances = computed(() => unique(this.options.value().insurances));
  readonly optionsError = this.options.error;

  /** Aplica (ou remove, com valor vazio) um filtro e volta à primeira página. */
  applyFilter(key: string, value: string): void {
    this.filters.update((current) => {
      const rest = current.filter((filter) => filter['key'] !== key);
      return value ? [...rest, { key, value }] : rest;
    });
    this.page.set(1);
  }

  search(term: string): void {
    this.keywords.set(term ? term.split(' ').filter(Boolean) : []);
    this.page.set(1);
  }

  async remove(ids: string[]): Promise<void> {
    await this.deleteUseCase.delete({ ids });
    this.listing.reload();
    // As opções de filtro derivam dos próprios pacientes, então uma exclusão
    // pode esvaziar uma cidade ou convênio da lista.
    this.options.reload();
  }

  /** Força releitura da listagem e das opções de filtro após escrita externa. */
  reload(): void {
    this.listing.reload();
    this.options.reload();
  }
}

/**
 * Remove duplicatas das opções de filtro.
 *
 * `listCities`/`listInsurance` devolvem um valor por paciente, então uma cidade
 * com dez pacientes aparecia dez vezes no filtro do projeto React.
 */
function unique(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, 'pt-BR'),
  );
}
