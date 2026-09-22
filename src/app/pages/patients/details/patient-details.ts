import { Component, computed, effect, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Breadcrumb } from '@app/shared/components/breadcrumb/breadcrumb';
import { Icon } from '@app/shared/components/icon/icon';
import {
  Table,
  type DataColumn,
  type TablePagination,
} from '@app/shared/components/table/table';
import { getAge, formmatDate } from '@core/utils/date-utils';
import { PatientDetailsFacade } from './patient-details-facade';

const EXAM_COLUMNS: DataColumn[] = [
  { name: 'Exame', key: 'name', type: 'text', width: '35%' },
  { name: 'Requisição', key: 'requisitionDate', type: 'text', width: '20%' },
  { name: 'Realização', key: 'realizationDate', type: 'text', width: '20%' },
  { name: 'Status', key: 'status', type: 'status', width: '25%' },
];

const PRESCRIPTION_COLUMNS: DataColumn[] = [
  { name: 'Medicamento', key: 'medicament', type: 'text', width: '45%' },
  { name: 'Data', key: 'date', type: 'text', width: '30%' },
  { name: 'Status', key: 'status', type: 'status', width: '25%' },
];

/**
 * Página de detalhes do paciente, com abas Resumo/Exames/Receitas/
 * Atestados/Histórico — todas a mesma rota `detalhes/:id`, o `aba` vem de
 * `route.data` via `withComponentInputBinding`, o mesmo mecanismo que já
 * traz `:id` como input. Trocar de aba navega (`routerLink`), então a URL
 * e o botão voltar do navegador continuam significando algo.
 *
 * Atestados ainda não tem contrapartida no domínio — o recurso do projeto
 * React nunca foi vinculado a um paciente, é só um gerador de impressão —
 * então a aba mostra um aviso em vez de fingir dado que não existe.
 */
@Component({
  selector: 'app-patient-details',
  imports: [Breadcrumb, Icon, RouterLink, RouterLinkActive, Table],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss',
})
export class PatientDetails {
  readonly id = input.required<string>();
  readonly aba = input<'resumo' | 'exames' | 'receitas' | 'atestados' | 'historico'>(
    'resumo',
  );

  protected readonly router = inject(Router);
  protected readonly facade = inject(PatientDetailsFacade);

  protected readonly formatar = (data: unknown) =>
    data ? formmatDate(data as unknown as Date) : '—';

  protected readonly idade = computed(() => {
    const p = this.facade.patient();
    return p ? getAge(p.birthday) : null;
  });

  protected readonly breadcrumb = computed(() => [
    { label: 'Pacientes', path: '/pacientes' },
    { label: this.facade.patient()?.name ?? 'Detalhes', path: '' },
  ]);

  protected readonly examRows = computed(() =>
    this.facade.exams().map((e: any) => ({
      ...e,
      requisitionDate: this.formatar(e.requisitionDate),
      realizationDate: e.realizationDate ? this.formatar(e.realizationDate) : '—',
    })),
  );

  protected readonly examPagination = computed<TablePagination>(() => ({
    entityName: 'Exames',
    page: this.facade.examPage(),
    pageSize: 10,
    totalPages: this.facade.examsTotalPages(),
    totalEntries: this.facade.examsTotal(),
  }));

  protected readonly prescriptionRows = computed(() =>
    this.facade.prescriptions().map((p: any) => ({
      ...p,
      date: this.formatar(p.date),
    })),
  );

  protected readonly prescriptionPagination = computed<TablePagination>(() => ({
    entityName: 'Receitas',
    page: this.facade.prescriptionPage(),
    pageSize: 10,
    totalPages: this.facade.prescriptionsTotalPages(),
    totalEntries: this.facade.prescriptionsTotal(),
  }));

  protected readonly ultimoAtendimento = computed(() => this.facade.historico()[0] ?? null);

  protected readonly examColumns = EXAM_COLUMNS;
  protected readonly prescriptionColumns = PRESCRIPTION_COLUMNS;

  constructor() {
    effect(() => this.facade.patientId.set(this.id()));
  }
}
