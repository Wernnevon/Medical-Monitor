import { Component, computed, inject, input } from '@angular/core';
import { FormField, type FieldTree } from '@angular/forms/signals';
import { MASCARAS, type NomeMascara } from '@core/utils/masks';

/**
 * Campo de formulário com rótulo flutuante, máscara e mensagem de erro.
 *
 * Substitui o `Input` do projeto React, que dependia do `useField` do
 * `@unform/core`. Aqui o vínculo é a diretiva `FormField` dos Signal Forms,
 * então o valor, o estado de toque e os erros vêm do próprio campo — não há
 * `ref` nem registro manual.
 *
 * O erro só aparece depois que o usuário sai do campo: validar enquanto
 * ainda se digita acusa "campo obrigatório" no primeiro caractere, o que
 * atrapalha mais do que ajuda.
 */
@Component({
  selector: 'app-field',
  imports: [FormField],
  template: `
    <label class="campo" [class.campo--erro]="mostraErro()" [title]="dica()">
      <span class="rotulo">{{ rotulo() }}{{ obrigatorio() ? ' *' : '' }}</span>
      @if (multilinha()) {
        <textarea
          [formField]="campo()"
          rows="4"
          [attr.aria-invalid]="mostraErro()"
        ></textarea>
      } @else {
        <input
          [formField]="campo()"
          [type]="tipo()"
          [attr.inputmode]="modo()"
          [attr.aria-invalid]="mostraErro()"
          (input)="aplicaMascara($event)"
        />
      }
      @if (mostraErro()) {
        <span class="erro" role="alert">{{ mensagem() }}</span>
      }
    </label>
  `,
  styleUrl: './field.scss',
})
export class Field {
  // Tipado como `string` porque todo campo do formulário é texto — inclusive
  // os numéricos e os de data, que é o que o `<input>` entrega. `any` aqui
  // degrada para `unknown` no binding e o compilador de template recusa.
  readonly campo = input.required<FieldTree<string>>();
  readonly rotulo = input.required<string>();
  readonly tipo = input<'text' | 'date' | 'number' | 'tel'>('text');
  readonly dica = input('');
  readonly mascara = input<NomeMascara | ''>('');
  readonly modo = input<string | null>(null);
  /** Textarea em vez de input — a anamnese é o único campo do cadastro que
   *  é texto livre e longo o bastante pra precisar de mais de uma linha. */
  readonly multilinha = input(false);

  protected readonly estado = computed(() => this.campo()());

  protected readonly obrigatorio = computed(() => this.estado().required());

  protected readonly mostraErro = computed(
    () => this.estado().touched() && this.estado().errors().length > 0,
  );

  protected readonly mensagem = computed(
    () => this.estado().errors()[0]?.message ?? 'Campo inválido',
  );

  protected aplicaMascara(evento: Event): void {
    const nome = this.mascara();
    if (!nome) return;

    const alvo = evento.target as HTMLInputElement;
    const formatado = MASCARAS[nome](alvo.value);
    if (formatado === alvo.value) return;

    alvo.value = formatado;
    this.estado().value.set(formatado);
  }
}
