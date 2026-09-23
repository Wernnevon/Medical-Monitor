import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Popup } from './shared/components/popup/popup';
import { Toast } from './shared/components/toast/toast';
import { SideNav } from './shell/side-nav/side-nav';
import { TopBar } from './shell/top-bar/top-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNav, TopBar, Toast, Popup],
  template: `
    <app-side-nav />
    <main class="content">
      <app-top-bar />
      <div class="pagina">
        <router-outlet />
      </div>
    </main>
    <app-toast />
    <app-popup />
  `,
  styleUrl: './app.scss',
})
export class App {}
