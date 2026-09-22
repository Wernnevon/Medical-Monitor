import { Component, input, output, signal } from '@angular/core';
import { ClickOutside } from '@app/directives/click-outside';
import { Icon } from '../icon/icon';

@Component({
  selector: 'app-radio-select',
  imports: [ClickOutside, Icon],
  template: `
    <div
      class="container"
      [class.container--open]="open()"
      (appClickOutside)="collapse()"
    >
      <button type="button" class="header" (click)="toggle()">
        <span>
          <app-icon name="IoFilter" size="30" />
          <label>{{ selected() || placeholder() }}</label>
        </span>
        <app-icon [name]="open() ? 'BsChevronUp' : 'BsChevronDown'" size="30" />
      </button>
      <div class="body" [class.body--open]="open()" role="radiogroup">
        <span class="options">
          @for (option of data(); track option) {
            <label class="item" [title]="option">
              <input
                type="radio"
                [name]="placeholder()"
                [value]="option"
                [checked]="selected() === option"
                (change)="pick(option)"
              />
              <label>{{ option }}</label>
            </label>
          }
        </span>
        <button type="button" class="item clear" (click)="pick('')">
          <app-icon name="RiDeleteBin6Line" />
          <label>Limpar</label>
        </button>
      </div>
    </div>
  `,
  styleUrl: './radio-select.scss',
})
export class RadioSelect {
  readonly placeholder = input('');
  readonly data = input.required<string[]>();

  readonly selectionChange = output<string>();

  protected readonly open = signal(false);
  protected readonly selected = signal('');

  protected toggle(): void {
    this.open.update((value) => !value);
  }

  protected collapse(): void {
    this.open.set(false);
  }

  protected pick(value: string): void {
    this.selected.set(value);
    this.selectionChange.emit(value);
  }
}
