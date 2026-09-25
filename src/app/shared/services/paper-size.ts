import { DOCUMENT } from '@angular/common';
import { Service, effect, inject, signal } from '@angular/core';

export type PaperSize = 'A4' | 'A5';

const CHAVE_ARMAZENAMENTO = 'vittaly-papel';

function papelInicial(): PaperSize {
  try {
    const salvo = localStorage.getItem(CHAVE_ARMAZENAMENTO);
    if (salvo === 'A4' || salvo === 'A5') return salvo;
  } catch {
    // Armazenamento bloqueado (aba anônima, política do navegador): usa o padrão.
  }
  return 'A4';
}

/**
 * Tamanho do papel da impressão dos documentos (receita, exames, atestado).
 *
 * `@page` não pode ficar no CSS de um componente — é regra global do
 * documento —, então o tamanho escolhido vira uma `<style>` no `<head>`.
 * Com isso a janela de impressão já abre no papel certo, sem o usuário
 * precisar trocar lá. A escolha fica salva no navegador.
 */
@Service()
export class PaperSizeService {
  private readonly documento = inject(DOCUMENT);
  private readonly papel = signal<PaperSize>(papelInicial());

  readonly tamanho = this.papel.asReadonly();

  constructor() {
    const estilo = this.documento.createElement('style');
    estilo.id = 'papel-impressao';
    this.documento.head.appendChild(estilo);

    effect(() => {
      const tamanho = this.papel();
      // Margem zero: o timbrado vai de borda a borda da folha, e quem
      // controla o respiro do texto é o próprio documento.
      estilo.textContent = `@page { size: ${tamanho}; margin: 0; }`;
      try {
        localStorage.setItem(CHAVE_ARMAZENAMENTO, tamanho);
      } catch {
        // Sem armazenamento a escolha vale só nesta sessão.
      }
    });
  }

  definir(tamanho: PaperSize): void {
    this.papel.set(tamanho);
  }
}
