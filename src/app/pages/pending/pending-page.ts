import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { Icon } from '@app/shared/components/icon/icon';

/**
 * Marcador para as telas ainda não portadas do projeto React.
 *
 * Sem isto, toda rota não migrada caía no wildcard e voltava calada para a
 * lista de pacientes — dava a impressão de que o menu e o botão "Novo"
 * estavam quebrados. Registrar a rota de verdade faz a navegação responder,
 * o item do menu acender e a tela dizer o que falta.
 *
 * O título e a referência vêm de `data` na rota, via `withComponentInputBinding`.
 */
@Component({
  selector: 'app-pending-page',
  imports: [Button, Icon],
  template: `
    <div class="card">
      <div class="body">
        <app-icon name="LuClipboardEdit" size="4rem" />
        <h1>{{ title() }}</h1>
        <p>Esta tela ainda não foi migrada para o Angular.</p>
        @if (reference()) {
          <p class="reference">
            Referência no app React: <code>{{ reference() }}</code>
          </p>
        }
        <app-button styleType="submit" (pressed)="goBack()">
          Voltar para Pacientes
        </app-button>
      </div>
    </div>
  `,
  styleUrl: './pending-page.scss',
})
export class PendingPage {
  readonly title = input('Em migração');
  readonly reference = input('');

  private readonly router = inject(Router);

  protected goBack(): void {
    this.router.navigate(['/pacientes']);
  }
}
