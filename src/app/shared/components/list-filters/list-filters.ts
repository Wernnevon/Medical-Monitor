import { Component, input, output } from '@angular/core';
import { Icon } from '../icon/icon';
import { RadioSelect } from '../filters/radio-select';
import { TextSearch } from '../filters/text-search';

export type DataFilter = {
  type: 'text' | 'radio';
  placeholder: string;
  options?: string[];
  handle: (value: string) => void;
};

/**
 * Barra de filtros solta no fundo da página, acima do card de dados — como
 * no protótipo, que nunca desenha filtro dentro do card da tabela. A busca
 * por texto vem primeiro e ocupa mais espaço; os `radio` vêm depois, em
 * pílulas menores. A ação principal da página, se houver, fecha a linha
 * alinhada à direita — na mesma altura dos filtros, sem gastar uma linha
 * só para ela no cabeçalho.
 */
@Component({
  selector: 'app-list-filters',
  imports: [Icon, RadioSelect, TextSearch],
  template: `
    <div class="filtros">
      @for (filter of filters(); track filter.placeholder) {
        @switch (filter.type) {
          @case ('text') {
            <app-text-search
              [placeholder]="filter.placeholder"
              (find)="filter.handle($event)"
            />
          }
          @case ('radio') {
            <app-radio-select
              [placeholder]="filter.placeholder"
              [data]="filter.options ?? []"
              (selectionChange)="filter.handle($event)"
            />
          }
        }
      }
      @if (actionLabel()) {
        <button type="button" class="acao" (click)="action.emit()">
          <app-icon name="FaPlus" />
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  styleUrl: './list-filters.scss',
})
export class ListFilters {
  readonly filters = input<DataFilter[]>([]);
  readonly actionLabel = input('');

  readonly action = output<void>();
}
