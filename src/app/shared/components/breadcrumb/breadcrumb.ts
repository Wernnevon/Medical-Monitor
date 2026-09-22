import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type BreadcrumbItem = {
  label: string;
  path: string;
};

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  template: `
    <nav aria-label="Trilha de navegação">
      <ul>
        @for (item of items(); track item.label) {
          <li>
            <a [routerLink]="item.path || '.'">{{ item.label }}</a>
          </li>
        }
      </ul>
    </nav>
  `,
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  readonly items = input.required<BreadcrumbItem[]>();
}
