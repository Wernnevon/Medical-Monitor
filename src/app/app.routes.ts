import type { Routes } from '@angular/router';

const pacientes = { label: 'Pacientes', path: '/pacientes' };

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
const pendente = (title: string, reference: string, crumbs: unknown[] = []) => ({
  loadComponent: () =>
    import('./pages/pending/pending-page').then((m) => m.PendingPage),
  data: { title, reference, crumbs },
});

export const routes: Routes = [
  {
    path: 'pacientes',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/patients/patient-list').then((m) => m.PatientList),
      },
      {
        path: 'novo',
        ...pendente('Cadastrar Paciente', 'Pages/Pacientes/Register', [
          pacientes,
          { label: 'Novo', path: '' },
        ]),
      },
      {
        path: 'editar/:id',
        ...pendente('Editar Paciente', 'Pages/Pacientes/Register', [
          pacientes,
          { label: 'Editar', path: '' },
        ]),
      },
      {
        path: 'detalhes/:id',
        children: [
          {
            path: '',
            ...pendente('Detalhes do Paciente', 'Pages/Pacientes/Details', [
              pacientes,
              { label: 'Detalhes', path: '' },
            ]),
          },
          {
            path: 'exames',
            ...pendente('Exames do Paciente', 'Pages/Exame', [
              pacientes,
              { label: 'Exames', path: '' },
            ]),
          },
          {
            path: 'receitas',
            ...pendente('Receitas do Paciente', 'Pages/Prescription', [
              pacientes,
              { label: 'Receitas', path: '' },
            ]),
          },
        ],
      },
    ],
  },
  {
    path: 'receitas',
    ...pendente('Receitas', 'Pages/Prescription', [
      { label: 'Receitas', path: '' },
    ]),
  },
  {
    path: 'exames',
    ...pendente('Exames', 'Pages/Exame', [{ label: 'Exames', path: '' }]),
  },
  {
    path: 'atestados',
    ...pendente('Atestados', 'Pages/Atestado', [
      { label: 'Atestados', path: '' },
    ]),
  },
  { path: '', pathMatch: 'full', redirectTo: 'pacientes' },
  { path: '**', redirectTo: 'pacientes' },
];
