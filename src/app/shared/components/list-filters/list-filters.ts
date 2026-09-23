import { Component, input } from '@angular/core';
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
 * pílulas menores.
 */
@Component({
  selector: 'app-list-filters',
  imports: [RadioSelect, TextSearch],
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
    </div>
  `,
  styleUrl: './list-filters.scss',
})
export class ListFilters {
  readonly filters = input<DataFilter[]>([]);
}
