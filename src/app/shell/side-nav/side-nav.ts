import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '@app/shared/components/icon/icon';
import type { IconName } from '@app/shared/components/icon/icons';

type NavEntry = {
  path: string;
  label: string;
  icon: IconName;
};

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, RouterLinkActive, Icon],
  template: `
    <nav class="sidenav" aria-label="Navegação principal">
      <div class="logo">
        <img src="/assets/logo_vittaly.svg" alt="Vittaly" draggable="false" />
      </div>
      @for (entry of entries; track entry.path) {
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
    </nav>
  `,
  styleUrl: './side-nav.scss',
})
export class SideNav {
  // `routerLinkActive` substitui o `useState` + `useLayoutEffect` que o
  // projeto React usava para derivar a aba ativa a partir do pathname.
  protected readonly entries: NavEntry[] = [
    { path: '/pacientes', label: 'Pacientes', icon: 'HiOutlineUserGroup' },
    { path: '/receitas', label: 'Receitas', icon: 'LuClipboardEdit' },
    { path: '/exames', label: 'Exame', icon: 'BiTestTube' },
    { path: '/atestados', label: 'Atestado', icon: 'AiOutlineAudit' },
  ];
}
