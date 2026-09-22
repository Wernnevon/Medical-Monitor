import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Popup } from './shared/components/popup/popup';
import { Toast } from './shared/components/toast/toast';
import { SideNav } from './shell/side-nav/side-nav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNav, Toast, Popup],
  template: `
    <app-side-nav />
    <main class="content">
      <router-outlet />
    </main>
    <app-toast />
    <app-popup />
  `,
  styleUrl: './app.scss',
})
export class App {}
