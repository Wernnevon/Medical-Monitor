import { Component, computed, input, output } from '@angular/core';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-pagination',
  imports: [Icon],
  template: `
    <div class="container">
      <label class="total">{{ totalEntries() }} {{ entityName() }}</label>
      <div class="pager" [class.pager--disabled]="disabled()">
        <button
          type="button"
          aria-label="Página anterior"
          [disabled]="disabled() || page() <= 1"
          (click)="go(page() - 1)"
        >
          <app-icon name="BsChevronLeft" />
        </button>
        <label>{{ page() }} de {{ totalPages() }}</label>
        <button
          type="button"
          aria-label="Próxima página"
          [disabled]="disabled() || page() >= totalPages()"
          (click)="go(page() + 1)"
        >
          <app-icon name="BsChevronRight" />
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

  protected go(next: number): void {
    if (next < 1 || next > this.totalPages()) return;
    this.pageChange.emit(next);
  }
}
