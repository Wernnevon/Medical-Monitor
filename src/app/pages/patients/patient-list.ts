import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Breadcrumb } from '@app/components/breadcrumb/breadcrumb';
import type { KebabItem } from '@app/components/kebab-menu/kebab-menu';
import {
  Table,
  type DataColumn,
  type DataFilter,
} from '@app/components/table/table';
import { PatientsFacade } from '@app/services/patients-facade';
import { PopupService } from '@app/services/popup';
import { ToastService, ToastType } from '@app/services/toast';

type PatientRow = {
  id: number;
  name: string;
  city: string;
  healthInsurance: string;
};

@Component({
  selector: 'app-patient-list',
  imports: [Breadcrumb, Table],
  template: `
    <app-breadcrumb [items]="breadcrumb" />
    <div class="list">
      <app-table
        title="Pacientes"
        icon="HiOutlineUserGroup"
        [rows]="rows()"
        [columns]="columns"
        [filters]="filters()"
        [pagination]="pagination()"
        [kebabItems]="kebabItems"
        (pageChange)="patients.page.set($event)"
        (add)="router.navigate(['/pacientes/novo'])"
      />
    </div>
  `,
  styleUrl: './patient-list.scss',
})
export class PatientList {
  protected readonly router = inject(Router);
  protected readonly patients = inject(PatientsFacade);

  private readonly toast = inject(ToastService);
  private readonly popup = inject(PopupService);

  protected readonly breadcrumb = [{ label: 'Pacientes', path: '' }];

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
      id: id ?? 0,
      name,
      city: adress.city,
      healthInsurance: health.healthInsurance,
    })),
  );

  protected readonly pagination = computed(() => ({
    entityName: 'Pacientes',
    page: this.patients.page(),
    pageSize: this.patients.pageSize(),
    totalPages: this.patients.totalPages(),
    totalEntries: this.patients.totalEntries(),
  }));

  protected readonly columns: DataColumn[] = [
    { name: 'Paciente', key: 'name', type: 'text', width: '40%' },
    { name: 'Cidade', key: 'city', type: 'text', width: '27.5%' },
    { name: 'Convênio', key: 'healthInsurance', type: 'text', width: '27.5%' },
    { name: '', key: 'action', type: 'action', width: '5%', align: 'center' },
  ];

  protected readonly filters = computed<DataFilter[]>(() => [
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
    {
      placeholder: 'Buscar',
      type: 'text',
      handle: (value) => this.patients.search(value),
    },
  ]);

  protected readonly kebabItems: KebabItem[] = [
    {
      icon: 'RiFileUserFill',
      name: 'Ver detalhes',
      action: (id) => this.router.navigate(['/pacientes/detalhes', id]),
    },
    {
      icon: 'FaUserEdit',
      name: 'Editar',
      action: (id) => this.router.navigate(['/pacientes/editar', id]),
    },
    {
      icon: 'LuClipboardEdit',
      name: 'Prescrever',
      action: (id) =>
        this.router.navigate(['/pacientes/detalhes', id, 'receitas']),
    },
    {
      icon: 'BiTestTube',
      name: 'Exame',
      action: (id) =>
        this.router.navigate(['/pacientes/detalhes', id, 'exames']),
    },
    {
      icon: 'TiUserDelete',
      name: 'Deletar',
      action: (id) => this.confirmDelete(id),
    },
  ];

  private confirmDelete(id: number): void {
    this.popup.show({
      data: {
        title: 'Excluir Paciente?',
        message:
          'Tem certeza de que deseja excluir? Não há como desfazer esta ação!',
      },
      onConfirm: async () => {
        try {
          await this.patients.remove([id]);
          this.toast.add('Paciente apagado', ToastType.SUCESS);
        } catch {
          this.toast.add(
            'Houve um problema ao apagar o paciente',
            ToastType.ERROR,
          );
        }
      },
    });
  }
}
