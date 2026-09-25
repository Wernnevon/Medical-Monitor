import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '@app/shared/services/auth';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { ProfessionalRole } from '@domain/entities';

/**
 * Restringe rotas ao profissional — assistente não prescreve, não solicita
 * exame nem emite atestado (ao menos até haver dispositivo conectado que
 * justifique abrir essas telas para ele).
 */
export const professionalOnlyGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  // O perfil carrega em segundo plano depois do bootstrap; num acesso direto
  // pela URL ele pode ainda não ter chegado.
  await auth.perfilCarregado();
  if (auth.usuarioAtual()?.role === ProfessionalRole.PROFISSIONAL) return true;

  toast.add('Esta área é exclusiva do profissional responsável', ToastType.WARNING);
  return router.createUrlTree(['/pacientes']);
};
