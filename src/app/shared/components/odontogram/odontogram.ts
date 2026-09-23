import { Component, input, output } from '@angular/core';

/** Numeração FDI da dentição permanente, por quadrante — padrão usado em
 *  odontogramas no Brasil (1º quadrante = superior direito, sentido
 *  horário). Sem dentição decídua (crianças) de propósito: o cadastro do
 *  paciente não guarda idade em anos exatos separada da data de nascimento
 *  de um jeito que valha a pena ramificar a tela por faixa etária ainda. */
export const QUADRANTE_SUPERIOR_DIREITO = [18, 17, 16, 15, 14, 13, 12, 11];
export const QUADRANTE_SUPERIOR_ESQUERDO = [21, 22, 23, 24, 25, 26, 27, 28];
export const QUADRANTE_INFERIOR_ESQUERDO = [38, 37, 36, 35, 34, 33, 32, 31];
export const QUADRANTE_INFERIOR_DIREITO = [41, 42, 43, 44, 45, 46, 47, 48];

/**
 * Odontograma — seleção visual de dentes pela numeração FDI, em vez de
 * digitar o número do dente à mão. Emite só a seleção (`Set<number>`); quem
 * usa decide o que fazer com os dentes marcados (aqui, virar item da lista
 * de exames como "Odontograma — Dente 16").
 */
@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.html',
  styleUrl: './odontogram.scss',
})
export class Odontogram {
  readonly selecionados = input.required<ReadonlySet<number>>();
  readonly denteToggle = output<number>();

  protected readonly superiorDireito = QUADRANTE_SUPERIOR_DIREITO;
  protected readonly superiorEsquerdo = QUADRANTE_SUPERIOR_ESQUERDO;
  protected readonly inferiorEsquerdo = QUADRANTE_INFERIOR_ESQUERDO;
  protected readonly inferiorDireito = QUADRANTE_INFERIOR_DIREITO;
}
