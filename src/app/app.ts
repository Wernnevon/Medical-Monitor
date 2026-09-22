import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Popup } from './components/popup/popup';
import { Toast } from './components/toast/toast';
import { SideNav } from './pages/side-nav/side-nav';

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
