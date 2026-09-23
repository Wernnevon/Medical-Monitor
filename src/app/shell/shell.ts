import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
export class Shell {}
