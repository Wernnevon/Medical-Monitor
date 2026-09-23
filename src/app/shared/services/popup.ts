import { Service, signal } from '@angular/core';
import type { IconName } from '../components/icon/icons';

export type PopupData = {
  icon?: IconName;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
};

export type PopupRequest = {
  data: PopupData;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
};

type PopupState = PopupRequest & { visible: boolean };

const CLOSED: PopupState = {
  visible: false,
  data: { title: '', message: '' },
  onConfirm: () => {},
};

/** Substitui o `PopupProvider` do React. Ver `ToastService` para o racional. */
@Service()
export class PopupService {
  private readonly state = signal<PopupState>(CLOSED);

  readonly current = this.state.asReadonly();

  show(request: PopupRequest): void {
    this.state.set({ ...request, visible: true });
  }

  async confirm(): Promise<void> {
    const { onConfirm } = this.state();
    this.close();
    await onConfirm();
  }

  cancel(): void {
    const { onCancel } = this.state();
    this.close();
    onCancel?.();
  }

  private close(): void {
    this.state.update((current) => ({ ...current, visible: false }));
  }
}
