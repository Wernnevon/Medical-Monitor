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
const pendente = (title: string, reference: string, crumbs: unknown[] = []) => ({
  loadComponent: () =>
    import('./pages/pending/pending-page').then((m) => m.PendingPage),
  data: { title, reference, crumbs },
});

/**
 * Uma das 5 abas da página de Detalhes do Paciente. Todas carregam o mesmo
 * componente; a aba ativa chega como `route.data.aba`, ligada ao input
 * `aba` do componente pelo `withComponentInputBinding` — o mesmo mecanismo
 * que já entrega `:id`. Trocar de aba navega de verdade, então a URL e o
 * botão voltar do navegador continuam significando algo.
 */
const detalhesAba = (aba: string) => ({
  loadComponent: () =>
    import('./pages/patients/details/patient-details').then(
      (m) => m.PatientDetails,
    ),
  data: { aba },
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
        children: [
          { path: '', ...detalhesAba('resumo') },
          { path: 'exames', ...detalhesAba('exames') },
          { path: 'receitas', ...detalhesAba('receitas') },
          { path: 'atestados', ...detalhesAba('atestados') },
          { path: 'historico', ...detalhesAba('historico') },
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
