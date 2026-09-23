import { Component, computed, inject } from '@angular/core';
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

const ENTRADAS: NavEntry[] = [
  { path: '/pacientes', label: 'Pacientes', icon: 'HiOutlineUserGroup' },
  { path: '/receitas', label: 'Receitas', icon: 'LuClipboardEdit' },
  { path: '/exames', label: 'Exame', icon: 'BiTestTube' },
  { path: '/atestados', label: 'Atestado', icon: 'AiOutlineAudit' },
];

const ROTULO_ROLE: Record<ProfessionalRole, string> = {
  [ProfessionalRole.PROFISSIONAL]: 'Profissional',
  [ProfessionalRole.ASSISTENTE]: 'Assistente',
};

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, RouterLinkActive, Icon],
  template: `
    <nav class="sidenav" aria-label="Navegação principal">
      <div class="logo">
        <img src="/assets/logo_vittaly.svg" alt="Vittaly" draggable="false" />
      </div>
      @for (entry of entries(); track entry.path) {
        <a
          class="link"
          [routerLink]="entry.path"
          routerLinkActive="link--active"
          draggable="false"
        >
          <app-icon [name]="entry.icon" size="2rem" />
          <span>{{ entry.label }}</span>
        </a>
      }
      <div class="profissional">
        <app-icon name="HiOutlineUserCircle" size="2rem" />
        <span class="dados">
          <span class="nome">{{ usuario()?.name || 'Convidado' }}</span>
          <span class="role">{{ rotuloRole() }}</span>
        </span>
        <button type="button" class="sair" aria-label="Sair" (click)="sair()">
          <app-icon name="FiLogOut" size="1.4rem" />
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

  protected readonly rotuloRole = computed(
    () => (this.usuario() ? ROTULO_ROLE[this.usuario()!.role] : ''),
  );

  /** Assistente não prescreve, não solicita exame nem emite atestado — essas
   *  três entradas somem do menu em vez de aparecerem bloqueadas. */
  protected readonly entries = computed(() =>
    this.usuario()?.role === ProfessionalRole.PROFISSIONAL
      ? ENTRADAS
      : ENTRADAS.filter((entrada) => entrada.path === '/pacientes'),
  );

  protected sair(): void {
    this.auth.sair();
    this.router.navigate(['/entrar']);
  }
}
