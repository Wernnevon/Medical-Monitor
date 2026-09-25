import { Component, input, output } from '@angular/core';
import { Icon } from '../icon/icon';
import type { IconName } from '../icon/icons';
import { Pagination } from '../pagination/pagination';

export type ColumnType = 'text' | 'status' | 'action' | 'stacked';

export type DataColumn = {
  name: string;
  key: string;
  type: ColumnType;
  width?: string;
  align?: 'left' | 'right' | 'center';
  /** Só pro tipo `stacked`: chave da linha exibida como legenda, embaixo do
   *  valor principal (ex.: CPF embaixo do nome). */
  subtitleKey?: string;
  /** Só pro tipo `status`: vira botão em vez de selo estático, emitindo
   *  `statusChange` no clique — usado onde o status é um alternador de dois
   *  valores (ex.: exame Em Andamento/Realizado), não em toda listagem que
   *  mostra status (ex.: Ativo/Inativo de paciente continua só leitura). */
  editable?: boolean;
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
  Ativo: 'positive',
  'Em Andamento': 'negative',
  Administrando: 'negative',
  Inativo: 'negative',
};

/**
 * O grid de dados em si — cabeçalho de página, descrição e filtros vivem
 * fora, direto na página (`app-page-header` / `app-list-filters`), soltos no
 * fundo neutro como no protótipo. O que sobra aqui como card branco com
 * sombra é só a grade de linhas e a paginação.
 */
@Component({
  selector: 'app-table',
  imports: [Icon, Pagination],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  readonly columns = input.required<DataColumn[]>();
  readonly rows = input.required<Record<string, any>[]>();
  readonly loading = input(false);
  /** Ausente quando a listagem é pequena e vem inteira de uma vez (ex.: o
   *  histórico do paciente) — o rodapé de paginação some nesse caso. */
  readonly pagination = input<TablePagination | null>(null);
  /** Ícone do botão de ação sempre visível na coluna `action` — leva pra
   *  tela cheia de detalhes. O clique na linha, por sua vez, só atualiza a
   *  prévia (quando `selectable` está ligado): são ações diferentes de
   *  propósito, não a mesma coisa duas vezes. */
  readonly rowActionIcon = input<IconName | null>(null);
  readonly rowActionLabel = input('Ver detalhes');
  /** Habilita clique na linha — usado pela lista de pacientes para
   *  atualizar o painel de acesso rápido sem navegar pra outra tela. */
  readonly selectable = input(false);
  readonly selectedId = input<string | number | null>(null);
  /** Sem fundo, raio e sombra próprios — para quando a grade já vive dentro
   *  de um card da página (ex.: "Últimos Atendimentos" no resumo do
   *  paciente), evitando a moldura dupla. */
  readonly flat = input(false);

  readonly pageChange = output<number>();
  readonly rowSelect = output<string | number>();
  readonly rowAction = output<string | number>();
  /** Emitido quando o selo de status editável é clicado — quem escuta
   *  decide o que "trocar o status" significa pra aquela linha. */
  readonly statusChange = output<string | number>();

  protected tone(value: unknown): string {
    return STATUS_TONE[String(value)] ?? 'negative';
  }
}
