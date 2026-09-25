import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';
import type { IconName } from '../icon/icons';

/**
 * Cabeçalho de página: ícone + título + descrição — solto no fundo da
 * página, e não dentro do card de dados, como no protótipo. A ação
 * principal ("Novo Paciente") fica na barra de filtros, ver `ListFilters`. A listagem de pacientes foi a primeira a usar, mas o
 * formato se repete nas outras listagens (Exames, Receitas, Atestados).
 */
@Component({
  selector: 'app-page-header',
  imports: [Icon],
  template: `
    <div class="cabecalho">
      <div class="icone">
        <app-icon [name]="icon()" size="1.75rem" />
      </div>
      <div class="texto">
        <h1>{{ heading() }}</h1>
        @if (description()) {
          <p>{{ description() }}</p>
        }
      </div>
    </div>
  `,
  styleUrl: './page-header.scss',
})
export class PageHeader {
  readonly icon = input<IconName>('HiOutlineUserGroup');
  /** Nomeado `heading`, e não `title` — `title` é atributo HTML nativo, e
   *  escrevê-lo como atributo estático (`title="Pacientes"`) também vira
   *  tooltip nativo do navegador no elemento hospedeiro. */
  readonly heading = input('');
  readonly description = input('');
}
