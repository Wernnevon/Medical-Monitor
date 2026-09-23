import { Component, computed, inject } from '@angular/core';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { PopupService } from '@app/shared/services/popup';

/**
 * Diálogo de confirmação global.
 *
 * No React, `Popup` e `Modal` eram componentes separados; aqui o Modal era só
 * um contêiner com overlay e foi absorvido, já que nada mais o utilizava.
 */
@Component({
  selector: 'app-popup',
  imports: [Button, Icon],
  template: `
    @if (state().visible) {
      <div class="overlay" (click)="service.cancel()">
        <section
          class="popup"
          role="alertdialog"
          aria-modal="true"
          [attr.aria-label]="state().data.title"
          (click)="$event.stopPropagation()"
        >
          <header>
            <app-icon [name]="icon()" size="24" />
            <label>{{ state().data.title }}</label>
            <button
              type="button"
              class="close"
              aria-label="Fechar"
              (click)="service.cancel()"
            >
              <app-icon name="CgCloseO" size="24" />
            </button>
          </header>
          <main>
            <p>{{ state().data.message }}</p>
          </main>
          <footer>
            <app-button styleType="back" (pressed)="service.cancel()">
              {{ state().data.cancelLabel ?? 'Cancelar' }}
            </app-button>
            <app-button styleType="submit" (pressed)="service.confirm()">
              {{ state().data.confirmLabel ?? 'Confirmar' }}
            </app-button>
          </footer>
        </section>
      </div>
    }
  `,
  styleUrl: './popup.scss',
})
export class Popup {
  protected readonly service = inject(PopupService);

  protected readonly state = this.service.current;

  protected readonly icon = computed(
    () => this.state().data.icon ?? 'IoMdInformationCircleOutline',
  );
}
