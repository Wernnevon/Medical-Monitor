import { Directive, HostListener, input } from '@angular/core';

@Directive({
  selector: 'input[appInputMask]',
})
export class InputMaskDirective {
  readonly mask = input<'numero' | 'numero-unidade' | 'texto-numerico'>('texto-numerico');

  @HostListener('input', ['$event'])
  aoDigitar(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const tipo = this.mask();

    switch (tipo) {
      case 'numero':
        input.value = input.value.replace(/[^\d]/g, '');
        break;
      case 'numero-unidade':
        input.value = input.value.replace(/[^0-9a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '');
        break;
      case 'texto-numerico':
        input.value = input.value.replace(/[^0-9a-záàâãéèêíïóôõöúçñA-ZÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]/g, '');
        break;
    }
  }
}
