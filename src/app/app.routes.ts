import type { Routes } from '@angular/router';

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
 */
export const routes: Routes = [
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
    loadComponent: () =>
      import('./pages/prescriptions/prescription-page').then((m) => m.PrescriptionPage),
  },
  {
    path: 'exames',
    loadComponent: () =>
      import('./pages/exams/exam-page').then((m) => m.ExamPage),
  },
  {
    path: 'atestados',
    loadComponent: () =>
      import('./pages/certificates/certificate-page').then((m) => m.CertificatePage),
  },
  { path: '', pathMatch: 'full', redirectTo: 'pacientes' },
  { path: '**', redirectTo: 'pacientes' },
];
