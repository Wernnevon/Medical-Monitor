import {
  Component,
  computed,
  effect,
  inject,
  isDevMode,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Icon } from '@app/shared/components/icon/icon';
import { ListFilters, type DataFilter } from '@app/shared/components/list-filters/list-filters';
import { PageHeader } from '@app/shared/components/page-header/page-header';
import { Table, type DataColumn } from '@app/shared/components/table/table';
import { PatientsFacade } from '@app/pages/patients/patients-facade';
import { ExamStatus, PrescriptionStatus, type Patient } from '@domain/entities';
import { ExamAdd, PatientAdd, PrescriptionAdd } from '@domain/tokens';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { PatientQuickPanel } from './patient-quick-panel';

/** Nomes fictícios pro seed de exames/receitas — só pra "Últimos
 *  Atendimentos" ter o que mostrar nos pacientes de teste; nada disso é
 *  gravado fora do IndexedDB local. */
const EXAMES_FICTICIOS = [
  'Hemograma Completo',
  'Raio-X de Tórax',
  'Eletrocardiograma',
  'Ultrassonografia Abdominal',
  'Exame de Urina',
];

const MEDICAMENTOS_FICTICIOS = [
  'Dipirona 500mg',
  'Amoxicilina 500mg',
  'Losartana 50mg',
  'Omeprazol 20mg',
  'Paracetamol 750mg',
];

const dataFicticia = (diasAtras: number): string => {
  const data = new Date();
  data.setDate(data.getDate() - diasAtras);
  return data.toISOString().slice(0, 10);
};

/** Formato do fixture em `public/dev-data/patients-seed.json`. */
type PatientSeed = {
  name: string;
  motherName: string;
  fatherName: string;
  birthday: string;
  rg: string;
  cpf: string;
  gender: string;
  phone?: string;
  anamnese: string;
  adress: {
    street: string;
    number: number;
    neighborhood: string;
    complement?: string;
    city: string;
  };
  health: {
    healthInsurance: string;
    allergy?: string;
    weight?: number;
    height?: number;
  };
};

type PatientRow = {
  id: string;
  name: string;
  city: string;
  healthInsurance: string;
  status: string;
};

@Component({
  selector: 'app-patient-list',
  imports: [Icon, ListFilters, PageHeader, Table, PatientQuickPanel],
  template: `
    <app-page-header
      heading="Pacientes"
      description="Gerencie o cadastro, histórico e documentos dos seus pacientes."
      icon="HiOutlineUserGroup"
      actionLabel="Novo Paciente"
      (action)="router.navigate(['/pacientes/novo'])"
    />
    <app-list-filters [filters]="filters()" />
    @if (mostrarSeed()) {
      <button type="button" class="seed-dev" (click)="preencherComDadosFicticios()">
        <app-icon name="FaPlus" size="1rem" />
        {{ semeando() ? 'Preenchendo...' : 'Preencher com dados fictícios (dev)' }}
      </button>
    }
    <div class="conteudo">
      <div class="list">
        <app-table
          [rows]="rows()"
          [columns]="columns"
          [pagination]="pagination()"
          rowActionIcon="HiOutlineEye"
          rowActionLabel="Ver detalhes"
          [selectable]="true"
          [selectedId]="selecionadoId()"
          (rowSelect)="selecionar($event)"
          (rowAction)="router.navigate(['/pacientes/detalhes', $event])"
          (pageChange)="patients.page.set($event)"
        />
      </div>
      <app-patient-quick-panel [patient]="pacienteSelecionado()" />
    </div>
  `,
  styleUrl: './patient-list.scss',
})
export class PatientList {
  protected readonly router = inject(Router);
  protected readonly patients = inject(PatientsFacade);

  private readonly toast = inject(ToastService);
  private readonly adicionar = inject(PatientAdd);
  private readonly adicionarExame = inject(ExamAdd);
  private readonly adicionarReceita = inject(PrescriptionAdd);

  /**
   * Atalho só de desenvolvimento pra popular a base com pacientes fictícios,
   * espelhando o `fillPatientDB` que existia no app React (`db.json`).
   * `isDevMode()` garante que some de builds de produção sem precisar de
   * feature flag — e o fixture em si nunca é commitado (`.gitignore`).
   */
  protected readonly mostrarSeed = signal(isDevMode());
  protected readonly semeando = signal(false);

  protected async preencherComDadosFicticios(): Promise<void> {
    this.semeando.set(true);
    try {
      const resposta = await fetch('/dev-data/patients-seed.json');
      if (!resposta.ok) throw new Error('fixture ausente');
      const pacientes: PatientSeed[] = await resposta.json();
      for (const [indice, paciente] of pacientes.entries()) {
        // Gerado aqui em vez de deixar `stamped()` preencher, porque exames
        // e receitas fictícios precisam do id do paciente pra vincular —
        // `PatientAdd.store` não devolve a entidade gravada.
        const id = crypto.randomUUID();
        const dados: Patient = {
          id,
          ...paciente,
          birthday: paciente.birthday as unknown as Date,
        };
        await this.adicionar.store({ data: dados });

        await this.adicionarExame.store({
          data: {
            id: '',
            patientId: id,
            name: EXAMES_FICTICIOS[indice % EXAMES_FICTICIOS.length],
            requisitionDate: dataFicticia(30) as unknown as Date,
            realizationDate: dataFicticia(20) as unknown as Date,
            status: ExamStatus.DONE,
          },
        });
        await this.adicionarExame.store({
          data: {
            id: '',
            patientId: id,
            name: EXAMES_FICTICIOS[(indice + 1) % EXAMES_FICTICIOS.length],
            requisitionDate: dataFicticia(5) as unknown as Date,
            status: ExamStatus.IN_PROGRESS,
          },
        });
        await this.adicionarReceita.store({
          data: {
            id: '',
            patientId: id,
            medicament: MEDICAMENTOS_FICTICIOS[indice % MEDICAMENTOS_FICTICIOS.length],
            date: dataFicticia(10) as unknown as Date,
            status: PrescriptionStatus.ADMINISTERING,
          },
        });
      }
      this.toast.add(
        `${pacientes.length} pacientes fictícios adicionados, com exames e receitas vinculados`,
        ToastType.SUCESS,
      );
      this.patients.reload();
    } catch {
      this.toast.add(
        'Fixture de desenvolvimento não encontrado (public/dev-data/patients-seed.json)',
        ToastType.ERROR,
      );
    } finally {
      this.semeando.set(false);
    }
  }

  /** Paciente em destaque no painel lateral. Começa com a primeira linha da
   *  página atual, como no protótipo, e segue o clique do usuário depois. */
  protected readonly selecionadoId = signal<string | null>(null);

  /** Clique na linha só troca a prévia no painel lateral — quem navega pra
   *  tela cheia é o ícone de olho na coluna de ação, ou o kebab. */
  protected selecionar(id: string | number): void {
    this.selecionadoId.set(String(id));
  }

  protected readonly pacienteSelecionado = computed(() => {
    const lista = this.patients.patients();
    if (!lista.length) return null;
    return lista.find((p) => p.id === this.selecionadoId()) ?? lista[0];
  });

  constructor() {
    effect(() => {
      if (this.patients.error()) {
        this.toast.add('Erro ao carregar pacientes', ToastType.ERROR);
      }
    });
    effect(() => {
      if (this.patients.optionsError()) {
        this.toast.add('Erro ao carregar dados de filtros', ToastType.ERROR);
      }
    });
  }

  protected readonly rows = computed<PatientRow[]>(() =>
    this.patients.patients().map(({ id, name, adress, health }) => ({
      id,
      name,
      city: adress.city,
      healthInsurance: health.healthInsurance,
      // Não há soft delete no domínio: todo paciente cadastrado está, por
      // definição, ativo. Um badge "Inativo" real depende de `deletedAt`
      // existir, o que o plano de sync deixou pra depois de propósito.
      status: 'Ativo',
    })),
  );

  protected readonly pagination = computed(() => ({
    entityName: 'pacientes',
    page: this.patients.page(),
    pageSize: this.patients.pageSize(),
    totalPages: this.patients.totalPages(),
    totalEntries: this.patients.totalEntries(),
  }));

  protected readonly columns: DataColumn[] = [
    { name: 'Paciente', key: 'name', type: 'text', width: '32%' },
    { name: 'Cidade', key: 'city', type: 'text', width: '22%' },
    { name: 'Convênio', key: 'healthInsurance', type: 'text', width: '22%' },
    { name: 'Status', key: 'status', type: 'status', width: '14%' },
    { name: '', key: 'action', type: 'action', width: '10%', align: 'center' },
  ];

  protected readonly filters = computed<DataFilter[]>(() => [
    {
      placeholder: 'Nome, CPF, telefone ou código...',
      type: 'text',
      handle: (value) => this.patients.search(value),
    },
    {
      placeholder: 'Convênio',
      type: 'radio',
      options: this.patients.insurances(),
      handle: (value) => this.patients.applyFilter('healthInsurance', value),
    },
    {
      placeholder: 'Cidade',
      type: 'radio',
      options: this.patients.cities(),
      handle: (value) => this.patients.applyFilter('city', value),
    },
  ]);

}
