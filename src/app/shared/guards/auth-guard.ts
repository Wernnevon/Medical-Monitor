import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth';

/** Bloqueia rotas protegidas sem sessão ativa — a restauração já rodou no bootstrap. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.autenticado()) return true;
  return router.createUrlTree(['/entrar']);
};

/** Só deixa passar quem já tem sessão — usado nas rotas de login/cadastro. */
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.autenticado()) return true;
  return router.createUrlTree(['/pacientes']);
};
