import { Component, inject } from '@angular/core';
import { Icon } from '../icon/icon';
import { TOAST_COLOR, TOAST_ICON, ToastService } from '@app/services/toast';

@Component({
  selector: 'app-toast',
  imports: [Icon],
  template: `
    <div class="wrapper" role="status" aria-live="polite">
      @for (toast of toasts(); track toast.id) {
        <div class="toast" [style.border-color]="color(toast.type)">
          <app-icon
            [name]="icon(toast.type)"
            size="32"
            [style.color]="color(toast.type)"
          />
          <span>{{ toast.message }}</span>
        </div>
      }
    </div>
  `,
  styleUrl: './toast.scss',
})
export class Toast {
  private readonly service = inject(ToastService);

  protected readonly toasts = this.service.toasts;

  protected color = (type: keyof typeof TOAST_COLOR) => TOAST_COLOR[type];
  protected icon = (type: keyof typeof TOAST_ICON) => TOAST_ICON[type];
}
