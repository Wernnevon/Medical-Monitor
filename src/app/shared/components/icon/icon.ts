import {
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { ICONS, type IconName } from './icons';

/**
 * Renderiza um ícone do conjunto em `icons.ts`.
 *
 * Os atributos da raiz do SVG são aplicados via `setAttribute` porque variam
 * por ícone: os de contorno trazem `stroke`, `stroke-width` e `fill="none"`,
 * enquanto os sólidos trazem só `fill`. Um template com bindings fixos
 * precisaria conhecer de antemão todo atributo possível.
 */
@Component({
  selector: 'app-icon',
  template: '',
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
      flex-shrink: 0;
    }
    svg {
      display: block;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<string | number>('1em');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly icon = computed(() => ICONS[this.name()]);

  constructor() {
    effect(() => {
      const { attrs, inner } = this.icon();
      const size = String(this.size());

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      for (const [key, value] of Object.entries(attrs)) {
        svg.setAttribute(key, value);
      }
      svg.setAttribute('width', size);
      svg.setAttribute('height', size);
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      // Os desenhos são constantes do próprio código, extraídas de
      // `react-icons` em tempo de migração — nunca entrada de usuário.
      svg.innerHTML = inner;

      this.host.nativeElement.replaceChildren(svg);
    });
  }
}
