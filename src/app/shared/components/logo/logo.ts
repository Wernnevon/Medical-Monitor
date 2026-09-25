import { Component } from '@angular/core';

/**
 * Símbolo da marca pintado com a cor da paleta.
 *
 * O SVG original é branco (feito para o menu azul-marinho) e some sobre o
 * fundo claro. Em vez de manter um arquivo por tema, o SVG vira máscara e a
 * cor vem de `--cor-marca-texto`, que já troca entre claro e escuro.
 */
@Component({
  selector: 'app-logo',
  host: { role: 'img', 'aria-label': 'Vittaly' },
  template: '',
  styles: `
    :host {
      display: block;
      aspect-ratio: 130.416 / 136.559;
      background-color: var(--cor-marca-texto);
      mask: url('/assets/logo_vittaly.svg') center / contain no-repeat;
    }
  `,
})
export class Logo {}
