import type { CanDeactivateFn } from '@angular/router';
import type { ExamPage } from './exam-page';

/** Impede saída da tela de exames com seleção pendente sem confirmação —
 *  ver `ExamPage.confirmarSaida`. Escopo restrito a esta tela: não é um
 *  guard genérico de "alterações não salvas" reaproveitável em outras. */
export const examLeaveGuard: CanDeactivateFn<ExamPage> = (component) => component.confirmarSaida();
