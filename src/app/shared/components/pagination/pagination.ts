import { Component, computed, input, output } from '@angular/core';
import { Icon } from '../icon/icon';

/** `null` marca as reticências entre grupos de páginas não-consecutivas. */
type PageButton = number | null;

/**
 * Monta a lista de botões de página como no protótipo — não é uma sequência
 * corrida de 1 a N: sempre mostra a primeira e a última, uma vizinhança em
 * torno da atual, e reticências no que fica de fora, pra caber mesmo com
 * dezenas de páginas.
 */
function botoesDePagina(atual: number, total: number): PageButton[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const vizinhanca = new Set(
    [1, 2, atual - 1, atual, atual + 1, total - 1, total].filter(
      (p) => p >= 1 && p <= total,
    ),
  );
  const paginas = [...vizinhanca].sort((a, b) => a - b);
  const botoes: PageButton[] = [];
  paginas.forEach((pagina, i) => {
    if (i > 0 && pagina - paginas[i - 1] > 1) botoes.push(null);
    botoes.push(pagina);
  });
  return botoes;
}

@Component({
  selector: 'app-pagination',
  imports: [Icon],
  template: `
    <div class="container">
      <label class="total">Mostrando {{ exibidos() }} de {{ totalEntries() }} {{ entityName() }}</label>
      <div class="pager" [class.pager--disabled]="disabled()">
        <button
          type="button"
          class="seta"
          aria-label="Página anterior"
          [disabled]="disabled() || page() <= 1"
          (click)="go(page() - 1)"
        >
          <app-icon name="BsChevronLeft" size="1rem" />
        </button>
        @for (botao of botoes(); track $index) {
          @if (botao === null) {
            <span class="reticencias" aria-hidden="true">…</span>
          } @else {
            <button
              type="button"
              class="numero"
              [class.numero--atual]="botao === page()"
              [attr.aria-current]="botao === page() ? 'page' : null"
              [disabled]="disabled()"
              (click)="go(botao)"
            >
              {{ botao }}
            </button>
          }
        }
        <button
          type="button"
          class="seta"
          aria-label="Próxima página"
          [disabled]="disabled() || page() >= totalPages()"
          (click)="go(page() + 1)"
        >
          <app-icon name="BsChevronRight" size="1rem" />
        </button>
      </div>
    </div>
  `,
  styleUrl: './pagination.scss',
})
export class Pagination {
  readonly entityName = input('Entidades');
  readonly page = input.required<number>();
  readonly pageSize = input.required<number>();
  readonly totalPages = input.required<number>();
  readonly totalEntries = input.required<number>();

  readonly pageChange = output<number>();

  protected readonly disabled = computed(
    () => this.totalEntries() < this.pageSize(),
  );

  /** Quantidade de linhas na página atual — não é acumulado, é o que a
   *  grade mostra agora (10 numa página cheia, menos na última). */
  protected readonly exibidos = computed(() =>
    Math.max(
      0,
      Math.min(
        this.pageSize(),
        this.totalEntries() - (this.page() - 1) * this.pageSize(),
      ),
    ),
  );

  protected readonly botoes = computed(() =>
    botoesDePagina(this.page(), this.totalPages()),
  );

  protected go(next: number): void {
    if (next < 1 || next > this.totalPages()) return;
    this.pageChange.emit(next);
  }
}
