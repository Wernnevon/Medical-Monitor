import { Directive, input } from '@angular/core';

@Directive({
  selector: 'input[appInputMask]',
  host: {
    '(input)': 'aoDigitar($event)',
  },
})
export class InputMaskDirective {
  readonly mask = input<'numero' | 'numero-unidade' | 'texto-numerico'>('texto-numerico');

  protected aoDigitar(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const tipo = this.mask();

    switch (tipo) {
      case 'numero':
        input.value = input.value.replace(/[^\d]/g, '');
        break;
      // "número + unidade" (ex.: "7 dias") e texto numérico livre (ex.:
      // "a cada 6 horas") aceitam o mesmo conjunto de caracteres — a
      // diferença entre os dois é só o placeholder/rótulo do campo, não a
      // máscara em si.
      case 'numero-unidade':
      case 'texto-numerico':
        input.value = input.value.replace(/[^0-9a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '');
        break;
    }
  }
}
