import { Component, input, output } from '@angular/core';
import { Icon } from '../icon/icon';
import type { IconName } from '../icon/icons';
import { KebabMenu, type KebabItem } from '../kebab-menu/kebab-menu';
import { Pagination } from '../pagination/pagination';
import { RadioSelect } from '../filters/radio-select';
import { TextSearch } from '../filters/text-search';

export type ColumnType = 'text' | 'status' | 'action';

export type DataColumn = {
  name: string;
  key: string;
  type: ColumnType;
  width?: string;
  align?: 'left' | 'right' | 'center';
};

export type DataFilter = {
  type: 'text' | 'radio';
  placeholder: string;
  options?: string[];
  handle: (value: string) => void;
};

export type TablePagination = {
  entityName: string;
  page: number;
  pageSize: number;
  totalPages: number;
  totalEntries: number;
};

/** Mapeia o rótulo de status para o estilo do badge. */
const STATUS_TONE: Record<string, 'positive' | 'negative'> = {
  Realizado: 'positive',
  Suspenso: 'positive',
  'Em Andamento': 'negative',
  Administrando: 'negative',
};

@Component({
  selector: 'app-table',
  imports: [Icon, KebabMenu, Pagination, RadioSelect, TextSearch],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  readonly icon = input<IconName>('HiOutlineUserGroup');
  readonly title = input('Titulo');
  readonly columns = input.required<DataColumn[]>();
  readonly rows = input.required<Record<string, any>[]>();
  readonly filters = input<DataFilter[]>([]);
  readonly pagination = input.required<TablePagination>();
  readonly kebabItems = input<KebabItem[]>([]);
  readonly addLabel = input('Novo');
  /** Mostra o botão de criação no cabeçalho. Telas sem fluxo de criação
   *  ainda pronto (como as abas do paciente) escondem com `[showAdd]="false"`. */
  readonly showAdd = input(true);
  /** Habilita clique na linha — usado pela lista de pacientes para
   *  alimentar o painel de acesso rápido sem precisar de uma coluna extra. */
  readonly selectable = input(false);
  readonly selectedId = input<string | number | null>(null);

  readonly pageChange = output<number>();
  readonly add = output<void>();
  readonly rowSelect = output<string | number>();

  protected tone(value: unknown): string {
    return STATUS_TONE[String(value)] ?? 'negative';
  }
}
