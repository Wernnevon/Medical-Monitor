import { Component, computed, signal } from '@angular/core';
import { ThemeToggle } from '@app/shared/components/theme-toggle/theme-toggle';

const FORMATO_DATA: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

/**
 * Barra fixa no topo do conteúdo, com o alternador de tema e a data/hora à direita.
 *
 * A busca global do protótipo saiu: não existe endpoint de busca
 * cross-entidade, só a busca por página já ligada ao domínio em cada
 * listagem, e um campo que não busca nada é pior que não ter campo.
 */
@Component({
  selector: 'app-top-bar',
  imports: [ThemeToggle],
  template: `
    <app-theme-toggle />
    <time class="agora" [attr.datetime]="isoAgora()">{{ agoraFormatada() }}</time>
  `,
  styleUrl: './top-bar.scss',
})
export class TopBar {
  private readonly agora = signal(new Date());

  protected readonly isoAgora = computed(() => this.agora().toISOString());

  protected readonly agoraFormatada = computed(() => {
    const texto = new Intl.DateTimeFormat('pt-BR', FORMATO_DATA).format(this.agora());
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  });
}
