import {
  Directive,
  input,
  output,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appTooltipTrigger]',
  host: {
    '[attr.aria-describedby]': 'tooltipId()',
  },
})
export class TooltipTriggerDirective {
  readonly tooltipId = input<string>('');
  readonly tooltipVisivel = output<boolean>();

  @HostListener('mouseenter')
  aoEntrarem() {
    this.tooltipVisivel.emit(true);
  }

  @HostListener('mouseleave')
  aoSairem() {
    this.tooltipVisivel.emit(false);
  }

  @HostListener('focus')
  aoFocar() {
    this.tooltipVisivel.emit(true);
  }

  @HostListener('blur')
  aoDesfocar() {
    this.tooltipVisivel.emit(false);
  }
}
