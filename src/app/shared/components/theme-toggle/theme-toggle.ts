import { Component, computed, inject } from '@angular/core';
import { Icon } from '@app/shared/components/icon/icon';
import { ThemeService } from '@app/shared/services/theme';

/** Alternador claro/escuro — o mesmo botão na barra do app e nas telas de acesso. */
@Component({
  selector: 'app-theme-toggle',
  imports: [Icon],
  template: `
    <button
      type="button"
      (click)="tema.alternar()"
      [attr.aria-label]="ehEscuro() ? 'Ativar tema claro' : 'Ativar tema escuro'"
      [attr.aria-pressed]="ehEscuro()"
    >
      <app-icon [name]="ehEscuro() ? 'HiOutlineMoon' : 'HiOutlineSun'" size="1.25rem" />
    </button>
  `,
  styles: `
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--tema-toggle-tamanho, 2.25rem);
      height: var(--tema-toggle-tamanho, 2.25rem);
      padding: 0;
      border: none;
      border-radius: var(--raio-pill);
      background: transparent;
      color: var(--cor-texto-suave);
      cursor: pointer;
      transition: background-color var(--transicao), color var(--transicao);

      &:hover {
        background: var(--cor-superficie-hover);
        color: var(--cor-texto);
      }

      &:focus-visible {
        outline: 2px solid var(--cor-foco);
        outline-offset: 2px;
      }
    }
  `,
})
export class ThemeToggle {
  protected readonly tema = inject(ThemeService);
  protected readonly ehEscuro = computed(() => this.tema.temaAtual() === 'escuro');
}
