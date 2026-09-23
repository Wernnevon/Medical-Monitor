import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

const FORMATO_DATA_EXTENSO: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

/**
 * Papel timbrado impresso — espelha `legacy/src/Presentation/Components/output`.
 *
 * O cabeçalho (médico, CRM, endereço) é dado fictício de propósito, igual ao
 * legado: não existe entidade de médico/consultório no domínio, então não há
 * nada real para exibir ali. É o mesmo texto do legado, só a logo troca pela
 * da Vittaly (o legado usava a marca "MM" da versão anterior do produto).
 *
 * `imprimir` dispara `window.print()`; o botão de imprimir e tudo fora deste
 * cartão saem da impressão via `@media print` no host.
 */
@Component({
  selector: 'app-print-output',
  imports: [Icon],
  templateUrl: './print-output.html',
  styleUrl: './print-output.scss',
})
export class PrintOutput {
  readonly patientName = input('');

  /** Data/hora de emissão do documento, por extenso — capturada na criação
   *  do componente, não recalculada a cada render, então não muda entre a
   *  pré-visualização e a impressão de fato. */
  protected readonly dataEmissao = formatarDataExtenso(new Date());

  protected imprimir(): void {
    window.print();
  }
}

function formatarDataExtenso(data: Date): string {
  const texto = new Intl.DateTimeFormat('pt-BR', FORMATO_DATA_EXTENSO).format(data);
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
