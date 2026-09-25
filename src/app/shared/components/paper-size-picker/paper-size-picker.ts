import { Component, inject } from '@angular/core';
import { PaperSizeService, type PaperSize } from '@app/shared/services/paper-size';

type OpcaoPapel = { valor: PaperSize; medida: string; descricao: string };

const OPCOES: OpcaoPapel[] = [
  {
    valor: 'A4',
    medida: '21 × 29,7 cm',
    descricao: 'Folha comum de impressora, a mesma de uma resma de papel sulfite.',
  },
  {
    valor: 'A5',
    medida: '14,8 × 21 cm',
    descricao:
      'Metade de uma A4. É o tamanho do bloco de receituário usado nos consultórios e no SUS.',
  },
];

/**
 * Escolha do tamanho do papel antes de imprimir. As duas folhas têm a mesma
 * proporção — a A5 é uma A4 dobrada ao meio —, então a pré-visualização na
 * tela não muda; muda o tamanho real do que sai da impressora.
 */
@Component({
  selector: 'app-paper-size-picker',
  template: `
    <fieldset class="grupo">
      <legend>Tamanho do papel</legend>
      @for (opcao of opcoes; track opcao.valor) {
        <label class="opcao" [class.opcao--ativa]="papel.tamanho() === opcao.valor">
          <input
            type="radio"
            name="tamanho-papel"
            [value]="opcao.valor"
            [checked]="papel.tamanho() === opcao.valor"
            (change)="papel.definir(opcao.valor)"
          />
          <span class="texto">
            <strong>{{ opcao.valor }} <span class="medida">· {{ opcao.medida }}</span></strong>
            <span class="descricao">{{ opcao.descricao }}</span>
          </span>
        </label>
      }
    </fieldset>
  `,
  styles: `
    .grupo {
      display: flex;
      flex-direction: column;
      gap: var(--esp-2);
      margin: 0;
      padding: 0;
      border: none;
    }

    legend {
      margin-bottom: var(--esp-2);
      padding: 0;
      color: var(--cor-texto);
      font-weight: var(--peso-forte);
    }

    .opcao {
      display: flex;
      align-items: flex-start;
      gap: var(--esp-3);
      padding: var(--esp-3);
      border: 1px solid var(--cor-borda);
      border-radius: var(--raio-sm);
      cursor: pointer;

      &:hover {
        background-color: var(--cor-superficie-alt);
      }

      &:has(input:focus-visible) {
        outline: 2px solid var(--cor-foco);
        outline-offset: 2px;
      }
    }

    .opcao--ativa {
      border-color: var(--cor-marca-texto);
      background-color: var(--cor-marca-suave);

      &:hover {
        background-color: var(--cor-marca-suave);
      }
    }

    input {
      margin: 0.2rem 0 0;
      accent-color: var(--cor-marca-texto);
    }

    .texto {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    strong {
      color: var(--cor-texto);
      font-weight: var(--peso-forte);
    }

    .medida {
      color: var(--cor-texto-suave);
      font-weight: var(--peso-corpo);
    }

    .descricao {
      color: var(--cor-texto-suave);
    }
  `,
})
export class PaperSizePicker {
  protected readonly papel = inject(PaperSizeService);
  protected readonly opcoes = OPCOES;
}
