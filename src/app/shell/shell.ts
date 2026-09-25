import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@app/shared/services/auth';
import { SideNav } from './side-nav/side-nav';
import { TopBar } from './top-bar/top-bar';

/**
 * Moldura do app autenticado: menu lateral + barra superior + rota filha.
 *
 * Fica de fora de `App` porque login e cadastro são páginas soltas, sem
 * menu — só existe usuário "logado" depois da autenticação, e mostrar o
 * menu de navegação para quem ainda nem entrou não faz sentido.
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SideNav, TopBar],
  template: `
    <app-side-nav />
    <main class="content">
      <app-top-bar />
      <div class="pagina">
        <router-outlet />
      </div>
    </main>
  `,
  styleUrl: './shell.scss',
})
export class Shell {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    // O guard só roda na navegação. Se a sessão cair com a tela aberta —
    // logout em outra aba, perfil inexistente descoberto depois do
    // bootstrap — é aqui que a pessoa volta para o login.
    effect(() => {
      if (!this.auth.autenticado()) this.router.navigate(['/entrar']);
    });
  }
}
