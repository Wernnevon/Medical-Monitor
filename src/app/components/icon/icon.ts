import { Component, computed, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { inject } from '@angular/core';
import { ICONS, type IconName } from './icons';

@Component({
  selector: 'app-icon',
  template: `<svg
    [attr.viewBox]="icon().viewBox"
    [attr.fill]="icon().fill"
    [attr.width]="size()"
    [attr.height]="size()"
    [innerHTML]="inner()"
    aria-hidden="true"
    focusable="false"
  ></svg>`,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input<string | number>('1em');

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly icon = computed(() => ICONS[this.name()]);

  // Os desenhos são constantes do próprio código, extraídas de `react-icons`
  // em tempo de migração — nunca entrada de usuário.
  protected readonly inner = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.icon().inner),
  );
}
