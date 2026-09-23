import type { Routes } from '@angular/router';
import { authGuard, guestGuard } from './shared/guards/auth-guard';
import { professionalOnlyGuard } from './shared/guards/role-guard';
import { examLeaveGuard } from './pages/exams/exam-leave-guard';

/**
 * Espelha `legacy/src/Presentation/routes.tsx`.
 *
 * As factories de página (`Main/Factories/Pages/*`) desapareceram: cada rota
 * aponta direto para o componente, que resolve as próprias dependências com
 * `inject()`.
 *
 * `exames`/`receitas`/`atestados` são rotas gerais, não filhas de
 * `detalhes/:id`: `patientId` chega como query param oculto (ver "Ações
 * Rápidas" em `patient-details`), não como segmento de rota — assim as
 * mesmas telas também funcionam soltas, para quem chega direto do menu.
 *
 * `entrar`/`cadastro` ficam fora de `Shell`: sem sessão não há menu para
 * mostrar. Todo o resto exige sessão (`authGuard`); as três rotas clínicas
 * também exigem a role profissional (`professionalOnlyGuard`) — assistente
 * não prescreve, não solicita exame nem emite atestado.
 */
export const routes: Routes = [
  {
    path: 'entrar',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login),
  },
  {
    path: 'cadastro',
    canActivate: [guestGuard],
    loadComponent: () => import('./pages/auth/register/register').then((m) => m.Register),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./shell/shell').then((m) => m.Shell),
    children: [
      {
        path: 'pacientes',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/patients/list/patient-list').then((m) => m.PatientList),
          },
          {
            path: 'novo',
            loadComponent: () =>
              import('./pages/patients/register/patient-register').then(
                (m) => m.PatientRegister,
              ),
          },
          {
            path: 'editar/:id',
            loadComponent: () =>
              import('./pages/patients/register/patient-register').then(
                (m) => m.PatientRegister,
              ),
          },
          {
            path: 'detalhes/:id',
            loadComponent: () =>
              import('./pages/patients/details/patient-details').then(
                (m) => m.PatientDetails,
              ),
          },
        ],
      },
      {
        path: 'receitas',
        canActivate: [professionalOnlyGuard],
        loadComponent: () =>
          import('./pages/prescriptions/prescription-page').then((m) => m.PrescriptionPage),
      },
      {
        path: 'exames',
        canActivate: [professionalOnlyGuard],
        canDeactivate: [examLeaveGuard],
        loadComponent: () => import('./pages/exams/exam-page').then((m) => m.ExamPage),
      },
      {
        path: 'atestados',
        canActivate: [professionalOnlyGuard],
        loadComponent: () =>
          import('./pages/certificates/certificate-page').then((m) => m.CertificatePage),
      },
      { path: '', pathMatch: 'full', redirectTo: 'pacientes' },
      { path: '**', redirectTo: 'pacientes' },
    ],
  },
];
