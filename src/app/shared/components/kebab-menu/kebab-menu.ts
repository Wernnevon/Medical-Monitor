import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { ClickOutside } from '@app/shared/directives/click-outside';
import { Icon } from '../icon/icon';
import type { IconName } from '../icon/icons';

export type KebabItem = {
  icon: IconName;
  name: string;
  action: (rowId: string) => void;
};

@Component({
  selector: 'app-kebab-menu',
  imports: [ClickOutside, Icon],
  template: `
    <span (appClickOutside)="close()">
      <button
        #trigger
        type="button"
        class="kebab"
        aria-label="Ações"
        [attr.aria-expanded]="open()"
        (click)="toggle()"
      >
        <app-icon name="GoKebabHorizontal" />
      </button>
      <div
        #menu
        class="menu"
        [class.menu--open]="open()"
        [class.menu--overflowed]="overflowed()"
        role="menu"
      >
        @for (item of items(); track item.name) {
          <button type="button" role="menuitem" (click)="run(item)">
            <app-icon [name]="item.icon" />
            {{ item.name }}
          </button>
        }
      </div>
    </span>
  `,
  styleUrl: './kebab-menu.scss',
})
export class KebabMenu {
  readonly rowId = input.required<string>();
  readonly items = input.required<KebabItem[]>();

  private readonly menu = viewChild<ElementRef<HTMLDivElement>>('menu');

  protected readonly open = signal(false);
  protected readonly overflowed = signal(false);

  protected toggle(): void {
    const next = !this.open();
    this.open.set(next);
    if (next) queueMicrotask(() => this.flipIfClipped());
  }

  protected close(): void {
    if (this.open()) this.open.set(false);
  }

  protected run(item: KebabItem): void {
    item.action(this.rowId());
    this.close();
  }

  /** Abre para cima quando o menu passaria da borda inferior da janela. */
  private flipIfClipped(): void {
    const element = this.menu()?.nativeElement;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    this.overflowed.set(rect.y + rect.height > window.innerHeight);
  }
}
