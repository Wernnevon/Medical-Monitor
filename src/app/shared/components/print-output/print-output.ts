import { Component, input } from '@angular/core';
import { Icon } from '../icon/icon';

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

  protected imprimir(): void {
    window.print();
  }
}
