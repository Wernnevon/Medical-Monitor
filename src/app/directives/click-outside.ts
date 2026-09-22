import { Directive, ElementRef, inject, output } from '@angular/core';

/**
 * Dispara quando há clique fora do elemento hospedeiro.
 *
 * Equivale ao hook `useOutsideAlert` do projeto React. Como diretiva, dispensa
 * o `ref` manual que cada consumidor precisava criar e passar.
 */
@Directive({
  selector: '[appClickOutside]',
  host: {
    '(document:mousedown)': 'onDocumentMouseDown($event)',
  },
})
export class ClickOutside {
  readonly appClickOutside = output<void>();

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected onDocumentMouseDown(event: MouseEvent): void {
    const target = event.target as Node | null;
    if (target && !this.host.nativeElement.contains(target)) {
      this.appClickOutside.emit();
    }
  }
}
