import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Popup } from './shared/components/popup/popup';
import { Toast } from './shared/components/toast/toast';

/**
 * Raiz do app. Só o essencial que vale para toda rota, autenticada ou não:
 * o `router-outlet` e as camadas globais de feedback (toast, popup). O menu
 * lateral e a barra superior vivem em `Shell`, que só entra nas rotas
 * protegidas — ver `app.routes.ts`.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, Popup],
  template: `
    <router-outlet />
    <app-toast />
    <app-popup />
  `,
  styleUrl: './app.scss',
})
export class App {}
