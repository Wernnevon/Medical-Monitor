import type { Routes } from '@angular/router';


/**
 * Espelha `legacy/src/Presentation/routes.tsx`.
 *
 * As factories de página (`Main/Factories/Pages/*`) desapareceram: cada rota
 * aponta direto para o componente, que resolve as próprias dependências com
 * `inject()`.
 *
 * As telas ainda não portadas são rotas de verdade, servidas por `PendingPage`,
 * e não um redirecionamento silencioso — assim o menu acende, o botão "Novo"
 * leva a algum lugar e fica visível o que falta migrar. Conforme cada tela for
 * portada, troca-se o `loadComponent` e removem-se os `data`.
 */
const pendente = (title: string, reference: string) => ({
  loadComponent: () =>
    import('./pages/pending/pending-page').then((m) => m.PendingPage),
  data: { title, reference },
});

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
    ...pendente('Receitas', 'Pages/Prescription'),
  },
  {
    path: 'exames',
    ...pendente('Exames', 'Pages/Exame'),
  },
  {
    path: 'atestados',
    ...pendente('Atestados', 'Pages/Atestado'),
  },
  { path: '', pathMatch: 'full', redirectTo: 'pacientes' },
  { path: '**', redirectTo: 'pacientes' },
];
