import { Service, effect, signal } from '@angular/core';

export type Theme = 'claro' | 'escuro';

const CHAVE_ARMAZENAMENTO = 'vittaly-tema';

function temaInicial(): Theme {
  const salvo = localStorage.getItem(CHAVE_ARMAZENAMENTO);
  if (salvo === 'claro' || salvo === 'escuro') return salvo;
  return matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
}

/** Alterna o tema claro/escuro aplicando `data-theme` na raiz do documento. */
@Service()
export class ThemeService {
  private readonly tema = signal<Theme>(temaInicial());

  readonly temaAtual = this.tema.asReadonly();

  constructor() {
    effect(() => {
      const tema = this.tema();
      document.documentElement.setAttribute('data-theme', tema);
      localStorage.setItem(CHAVE_ARMAZENAMENTO, tema);
    });
  }

  alternar(): void {
    this.tema.update((atual) => (atual === 'claro' ? 'escuro' : 'claro'));
  }
}
