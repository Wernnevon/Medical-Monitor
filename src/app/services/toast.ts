import { Service, signal } from '@angular/core';
import type { IconName } from '../components/icon/icons';

export enum ToastType {
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  SUCESS = 'SUCESS',
}

export const TOAST_COLOR: Record<ToastType, string> = {
  [ToastType.WARNING]: '#FC0',
  [ToastType.ERROR]: '#C30',
  [ToastType.SUCESS]: '#390',
};

export const TOAST_ICON: Record<ToastType, IconName> = {
  [ToastType.WARNING]: 'FiAlertTriangle',
  [ToastType.ERROR]: 'VscError',
  [ToastType.SUCESS]: 'AiOutlineCheckCircle',
};

export type ToastMessage = {
  id: string;
  message: string;
  type: ToastType;
};

const DISMISS_AFTER_MS = 2000;

/**
 * Substitui o `ToastContext` do React.
 *
 * O contexto existia para atravessar a árvore de componentes; no Angular a
 * injeção já resolve isso, então sobra apenas o estado — um signal lido
 * diretamente pelo componente de exibição.
 */
@Service()
export class ToastService {
  private readonly items = signal<ToastMessage[]>([]);

  readonly toasts = this.items.asReadonly();

  add(message: string, type: ToastType = ToastType.WARNING): void {
    const id = crypto.randomUUID();
    this.items.update((current) => [...current, { id, message, type }]);
    setTimeout(() => this.dismiss(id), DISMISS_AFTER_MS);
  }

  dismiss(id: string): void {
    this.items.update((current) => current.filter((toast) => toast.id !== id));
  }
}
