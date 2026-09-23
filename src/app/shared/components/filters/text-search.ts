import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { Icon } from '../icon/icon';

const DEBOUNCE_MS = 250;

@Component({
  selector: 'app-text-search',
  imports: [Icon],
  template: `
    <div class="bar">
      <app-icon name="BsSearch" size="1.1rem" />
      <input
        type="search"
        [placeholder]="placeholder()"
        [attr.aria-label]="placeholder()"
        (input)="onInput($event)"
      />
    </div>
  `,
  styleUrl: './text-search.scss',
})
export class TextSearch {
  readonly placeholder = input('');

  readonly find = output<string>();

  // O projeto React disparava a busca a cada tecla, e cada disparo relia o
  // object store inteiro. O debounce corta isso sem mudar o comportamento
  // percebido.
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected onInput(event: Event): void {
    const { value } = event.target as HTMLInputElement;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.find.emit(value), DEBOUNCE_MS);
  }
}
