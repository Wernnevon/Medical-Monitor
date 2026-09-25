import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { PaperSizeService, type PaperSize } from '@app/shared/services/paper-size';
import { Icon } from '../icon/icon';

/** Largura e altura reais de cada papel, em mm. */
const MEDIDAS: Record<PaperSize, { largura: number; altura: number }> = {
  A4: { largura: 210, altura: 297 },
  A5: { largura: 148, altura: 210 },
};

const PX_POR_MM = 96 / 25.4;

/**
 * Papel timbrado da Vittaly em volta do conteúdo de um documento (receita,
 * requisição de exames, atestado) — reproduz o bloco impresso da clínica:
 * faixa azul no topo com a marca, faixa azul no pé com contato e endereço,
 * ambas com borda curva e filete dourado, e o dente em dourado claro como
 * marca d'água no canto inferior direito.
 *
 * O papel é sempre claro, inclusive no tema escuro: é pré-visualização de
 * uma folha impressa. Por isso os tokens de superfície e texto são fixados
 * aqui, e o conteúdo projetado herda.
 *
 * Na tela, a folha é montada no tamanho real do papel escolhido (A4 ou A5)
 * e reduzida com `zoom` para caber no painel — assim a pré-visualização
 * quebra as linhas exatamente como a impressão, e dá para medir quantas
 * folhas o conteúdo vai ocupar. Passando de uma, aparece um aviso.
 *
 * Na impressão, as faixas ficam `position: fixed` (o navegador repete
 * elementos fixos em toda página) e uma tabela reserva o espaço delas: o
 * `thead`/`tfoot` de uma tabela também se repetem a cada página, empurrando
 * o texto para fora de baixo das faixas. O `tfoot` leva junto a assinatura
 * (conteúdo projetado com o atributo `assinatura`), então ela sai em todas
 * as folhas.
 */
@Component({
  selector: 'app-letterhead',
  imports: [Icon],
  templateUrl: './letterhead.html',
  styleUrl: './letterhead.scss',
  host: { '[class.a5]': "papel.tamanho() === 'A5'" },
})
export class Letterhead {
  protected readonly papel = inject(PaperSizeService);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly papelRef = viewChild.required<ElementRef<HTMLElement>>('papelRef');
  private readonly topoRef = viewChild.required<ElementRef<HTMLElement>>('topoRef');
  private readonly peRef = viewChild.required<ElementRef<HTMLElement>>('peRef');
  private readonly assinaturaRef = viewChild.required<ElementRef<HTMLElement>>('assinaturaRef');

  protected readonly escala = signal(1);
  protected readonly folhas = signal(1);

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Observar a folha também cobre a troca de papel: a largura real dela
    // muda (210mm ↔ 148mm), o observador dispara e a escala é refeita.
    afterNextRender(() => {
      const observador = new ResizeObserver(() => this.medir());
      observador.observe(this.host.nativeElement);
      observador.observe(this.papelRef().nativeElement);
      destroyRef.onDestroy(() => observador.disconnect());
    });
  }

  private medir(): void {
    const disponivel = this.host.nativeElement.clientWidth;
    // Aba de pré-visualização escondida: nada para medir, mantém o último valor.
    if (!disponivel) return;

    const medidas = MEDIDAS[this.papel.tamanho()];
    this.escala.set(disponivel / (medidas.largura * PX_POR_MM));

    // Tudo medido no mesmo espaço (já com zoom), então a escala se cancela.
    const papel = this.papelRef().nativeElement.getBoundingClientRect();
    const topo = this.topoRef().nativeElement.getBoundingClientRect().height;
    const pe = this.peRef().nativeElement.getBoundingClientRect().height;
    const assinatura = this.assinaturaRef().nativeElement.getBoundingClientRect().height;
    const alturaPagina = papel.width * (medidas.altura / medidas.largura);

    // Faixas e assinatura se repetem em toda folha; o que sobra é do texto.
    // Numa folha só o conteúdo estica até preencher esse espaço, então a
    // conta dá exatamente 1 — o 1px de folga cobre arredondamento.
    const fixoPorFolha = topo + pe + assinatura;
    const conteudo = papel.height - fixoPorFolha;
    const utilPorFolha = alturaPagina - fixoPorFolha;
    this.folhas.set(Math.max(1, Math.ceil((conteudo - 1) / utilPorFolha)));
  }
}
