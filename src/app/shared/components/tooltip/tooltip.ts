import {
  Component,
  computed,
  effect,
  input,
  signal,
  viewChild,
  ViewEncapsulation,
  ElementRef,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-tooltip',
  template: `
    <div
      #ref
      class="tooltip"
      role="tooltip"
      [class.tooltip--visivel]="visivel()"
      [style]="estiloTooltip()"
    >
      {{ conteudo() }}
    </div>
  `,
  styles: `
    :host {
      --tooltip-bg: var(--cor-texto-suave);
      --tooltip-text: var(--cor-superficie);
      --tooltip-raio: var(--raio-sm);
    }

    .tooltip {
      position: fixed;
      z-index: 1000;
      padding: var(--esp-2) var(--esp-3);
      border-radius: var(--tooltip-raio);
      background-color: var(--tooltip-bg);
      color: var(--tooltip-text);
      font-size: var(--texto-xs);
      font-weight: var(--peso-medio);
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 200ms ease-out;
      box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    }

    .tooltip--visivel {
      opacity: 1;
      pointer-events: auto;
    }
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Tooltip {
  readonly conteudo = input<string>('');
  readonly visivel = input(false);

  private readonly ref = viewChild<ElementRef<HTMLDivElement>>('ref');

  protected readonly estiloTooltip = computed(() => {
    if (!this.visivel()) return '';

    const refEl = this.ref()?.nativeElement;
    if (!refEl) return '';

    const rect = refEl.parentElement?.getBoundingClientRect();
    if (!rect) return '';

    return `top: ${rect.bottom + 8}px; left: ${rect.left + rect.width / 2 - refEl.offsetWidth / 2}px;`;
  });
}
