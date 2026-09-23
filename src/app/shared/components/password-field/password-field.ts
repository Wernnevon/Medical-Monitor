import { Component, computed, input, signal } from '@angular/core';
import { FormField, type FieldTree } from '@angular/forms/signals';
import { Icon } from '../icon/icon';

/**
 * Campo de senha com alternância de visibilidade.
 *
 * Não é o `app-field` com uma prop a mais: o botão de mostrar/ocultar muda o
 * `type` do input e precisa de um rótulo textual próprio (o ícone sozinho não
 * é confiável para leitor de tela, e o conjunto de ícones do projeto não tem
 * "olho riscado"), então ganhou componente à parte.
 */
@Component({
  selector: 'app-password-field',
  imports: [FormField, Icon],
  template: `
    <label class="campo" [class.campo--erro]="mostraErro()">
      <span class="rotulo">{{ rotulo() }}{{ obrigatorio() ? ' *' : '' }}</span>
      <span class="envoltorio">
        <input
          [formField]="campo()"
          [type]="mostrar() ? 'text' : 'password'"
          autocomplete="current-password"
          [attr.aria-invalid]="mostraErro()"
        />
        <button
          type="button"
          class="alternar"
          [attr.aria-pressed]="mostrar()"
          [attr.aria-label]="mostrar() ? 'Ocultar senha' : 'Mostrar senha'"
          (click)="mostrar.set(!mostrar())"
        >
          <app-icon name="HiOutlineEye" size="1.2rem" />
          <span>{{ mostrar() ? 'Ocultar' : 'Mostrar' }}</span>
        </button>
      </span>
      @if (mostraErro()) {
        <span class="erro" role="alert">{{ mensagem() }}</span>
      }
    </label>
  `,
  styleUrl: './password-field.scss',
})
export class PasswordField {
  readonly campo = input.required<FieldTree<string>>();
  readonly rotulo = input.required<string>();

  protected readonly mostrar = signal(false);

  protected readonly estado = computed(() => this.campo()());

  protected readonly obrigatorio = computed(() => this.estado().required());

  protected readonly mostraErro = computed(
    () => this.estado().touched() && this.estado().errors().length > 0,
  );

  protected readonly mensagem = computed(
    () => this.estado().errors()[0]?.message ?? 'Campo inválido',
  );
}
