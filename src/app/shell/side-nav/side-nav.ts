import { Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '@app/shared/components/icon/icon';
import type { IconName } from '@app/shared/components/icon/icons';
import { AuthService } from '@app/shared/services/auth';
import { ProfessionalRole } from '@domain/entities';

type NavEntry = {
  path: string;
  label: string;
  icon: IconName;
};

// Todos da mesma família (Lucide, traço 2): misturar conjuntos deixava
// pesos e cantos diferentes lado a lado no menu.
const ENTRADAS: NavEntry[] = [
  { path: '/pacientes', label: 'Pacientes', icon: 'LuUsers' },
  { path: '/receitas', label: 'Receitas', icon: 'LuPillBottle' },
  { path: '/exames', label: 'Exames', icon: 'LuFlaskConical' },
  { path: '/atestados', label: 'Atestados', icon: 'LuFileCheck' },
];

const ROTULO_ROLE: Record<ProfessionalRole, string> = {
  [ProfessionalRole.PROFISSIONAL]: 'Profissional',
  [ProfessionalRole.ASSISTENTE]: 'Assistente',
};

@Component({
  selector: 'app-side-nav',
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive, Icon],
  template: `
    <nav class="sidenav" aria-label="Navegação principal">
      <div class="marca">
        <img
          ngSrc="/assets/logo_vittaly.svg"
          width="130"
          height="137"
          priority
          alt=""
          draggable="false"
        />
        <span class="marca-nome">Vittaly</span>
        <span class="marca-sub">Centro Médico Odontológico</span>
      </div>
      <div class="links">
        @for (entry of entries(); track entry.path) {
          <a
            class="link"
            [routerLink]="entry.path"
            routerLinkActive="link--active"
            ariaCurrentWhenActive="page"
            draggable="false"
          >
            <app-icon [name]="entry.icon" size="1.375rem" />
            <span>{{ entry.label }}</span>
          </a>
        }
      </div>
      <div class="profissional">
        <span class="avatar" aria-hidden="true">{{ iniciais() }}</span>
        <span class="dados">
          <span class="nome">{{ usuario()?.name || 'Visitante' }}</span>
          <span class="role">{{ descricao() }}</span>
        </span>
        <button
          type="button"
          class="sair"
          aria-label="Sair da conta"
          title="Sair da conta"
          (click)="sair()"
        >
          <app-icon name="LuLogOut" size="1.25rem" />
        </button>
      </div>
    </nav>
  `,
  styleUrl: './side-nav.scss',
})
export class SideNav {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // `routerLinkActive` substitui o `useState` + `useLayoutEffect` que o
  // projeto React usava para derivar a aba ativa a partir do pathname.
  protected readonly usuario = this.auth.usuarioAtual;

  /** Especialidade de quem a cadastrou; a função fica de reserva para o
   *  assistente, que não tem especialidade. */
  protected readonly descricao = computed(() => {
    const usuario = this.usuario();
    if (!usuario) return '';
    return usuario.specialty?.trim() || ROTULO_ROLE[usuario.role];
  });

  /** Primeira letra do primeiro e do último nome: "Rafael Vieira" → "RV". */
  protected readonly iniciais = computed(() => {
    const partes = (this.usuario()?.name ?? '').trim().split(/\s+/).filter(Boolean);
    if (!partes.length) return '?';
    const primeira = partes[0][0];
    const ultima = partes.length > 1 ? partes[partes.length - 1][0] : '';
    return (primeira + ultima).toUpperCase();
  });

  /** Assistente não prescreve, não solicita exame nem emite atestado — essas
   *  três entradas somem do menu em vez de aparecerem bloqueadas. */
  protected readonly entries = computed(() =>
    this.usuario()?.role === ProfessionalRole.PROFISSIONAL
      ? ENTRADAS
      : ENTRADAS.filter((entrada) => entrada.path === '/pacientes'),
  );

  protected async sair(): Promise<void> {
    await this.auth.sair();
    await this.router.navigate(['/entrar']);
  }
}
