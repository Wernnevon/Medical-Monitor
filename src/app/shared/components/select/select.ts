import { Component, computed, input, signal, viewChild } from '@angular/core';
import type { FieldTree } from '@angular/forms/signals';
import { ClickOutside } from '@app/shared/directives/click-outside';
import { Icon } from '../icon/icon';

export type SelectOption = {
  value: string;
  label: string;
};

/**
 * Select custom, acessível como combobox (WAI-ARIA "Select Only").
 *
 * O `<select>` nativo não aceita estilização de verdade — é a queixa que
 * motivou este componente. Em troca, o teclado e a semântica ARIA precisam
 * ser recriados à mão: botão com `aria-haspopup="listbox"`, lista com
 * `role="listbox"` e opções com `role="option"`, navegação por seta,
 * seleção por Enter/Espaço e fechamento por Escape ou clique fora.
 *
 * Segue o mesmo padrão do `app-field`: recebe o `FieldTree` da etapa e
 * escreve nele diretamente, em vez de implementar `FormValueControl` — não
 * há necessidade de um segundo mecanismo de sincronização.
 */
@Component({
  selector: 'app-select',
  imports: [ClickOutside, Icon],
  template: `
    <div class="campo" [class.campo--erro]="mostraErro()">
      <span class="rotulo" [id]="idRotulo()">
        {{ rotulo() }}{{ obrigatorio() ? ' *' : '' }}
      </span>
      <div class="select" [class.select--open]="open()" (appClickOutside)="fecharSemFoco()">
        <button
          #gatilho
          type="button"
          class="gatilho"
          [id]="idBotao()"
          role="combobox"
          aria-haspopup="listbox"
          [attr.aria-expanded]="open()"
          [attr.aria-controls]="idLista()"
          [attr.aria-labelledby]="idRotulo() + ' ' + idBotao()"
          [attr.aria-invalid]="mostraErro()"
          (click)="alternar()"
          (keydown)="onTeclaBotao($event)"
        >
          <span class="valor" [class.valor--vazio]="!rotuloSelecionado()">
            {{ rotuloSelecionado() || placeholder() }}
          </span>
          <app-icon [name]="open() ? 'BsChevronUp' : 'BsChevronDown'" size="1.1rem" />
        </button>

        @if (open()) {
          <ul
            class="lista"
            [id]="idLista()"
            role="listbox"
            [attr.aria-labelledby]="idRotulo()"
            tabindex="-1"
            (keydown)="onTeclaLista($event)"
          >
            @for (opcao of options(); track opcao.value; let i = $index) {
              <li
                [id]="idOpcao(i)"
                role="option"
                [attr.aria-selected]="opcao.value === valor()"
                class="opcao"
                [class.opcao--ativa]="i === indiceAtivo()"
                [class.opcao--selecionada]="opcao.value === valor()"
                (mouseenter)="indiceAtivo.set(i)"
                (click)="selecionar(opcao)"
              >
                {{ opcao.label }}
              </li>
            }
          </ul>
        }
      </div>
      @if (mostraErro()) {
        <span class="erro" role="alert">{{ mensagem() }}</span>
      }
    </div>
  `,
  styleUrl: './select.scss',
})
export class Select {
  readonly campo = input.required<FieldTree<string>>();
  readonly rotulo = input.required<string>();
  readonly placeholder = input('Selecione');
  readonly options = input.required<SelectOption[]>();

  protected readonly open = signal(false);
  protected readonly indiceAtivo = signal(-1);

  private readonly gatilho = viewChild<{ nativeElement: HTMLButtonElement }>('gatilho');

  private readonly instancia = `sel-${Math.random().toString(36).slice(2, 9)}`;
  protected readonly idRotulo = computed(() => `${this.instancia}-rotulo`);
  protected readonly idBotao = computed(() => `${this.instancia}-botao`);
  protected readonly idLista = computed(() => `${this.instancia}-lista`);
  protected readonly idOpcao = (indice: number) => `${this.instancia}-opcao-${indice}`;

  protected readonly estado = computed(() => this.campo()());
  protected readonly valor = computed(() => this.estado().value());
  protected readonly obrigatorio = computed(() => this.estado().required());

  protected readonly rotuloSelecionado = computed(
    () => this.options().find((opcao) => opcao.value === this.valor())?.label ?? '',
  );

  protected readonly mostraErro = computed(
    () => this.estado().touched() && this.estado().errors().length > 0,
  );

  protected readonly mensagem = computed(
    () => this.estado().errors()[0]?.message ?? 'Campo inválido',
  );

  protected alternar(): void {
    this.open() ? this.fechar() : this.abrir();
  }

  protected abrir(): void {
    const atual = this.options().findIndex((opcao) => opcao.value === this.valor());
    this.indiceAtivo.set(atual >= 0 ? atual : 0);
    this.open.set(true);
  }

  protected fechar(): void {
    this.fecharSemFoco();
    this.gatilho()?.nativeElement.focus();
  }

  protected fecharSemFoco(): void {
    if (!this.open()) return;
    this.open.set(false);
    this.estado().markAsTouched();
  }

  protected selecionar(opcao: SelectOption): void {
    this.estado().value.set(opcao.value);
    this.fechar();
  }

  protected onTeclaBotao(evento: KeyboardEvent): void {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(evento.key)) {
      evento.preventDefault();
      if (!this.open()) this.abrir();
    }
  }

  protected onTeclaLista(evento: KeyboardEvent): void {
    const total = this.options().length;
    switch (evento.key) {
      case 'ArrowDown':
        evento.preventDefault();
        this.indiceAtivo.update((i) => Math.min(i + 1, total - 1));
        break;
      case 'ArrowUp':
        evento.preventDefault();
        this.indiceAtivo.update((i) => Math.max(i - 1, 0));
        break;
      case 'Home':
        evento.preventDefault();
        this.indiceAtivo.set(0);
        break;
      case 'End':
        evento.preventDefault();
        this.indiceAtivo.set(total - 1);
        break;
      case 'Enter':
      case ' ': {
        evento.preventDefault();
        const opcao = this.options()[this.indiceAtivo()];
        if (opcao) this.selecionar(opcao);
        break;
      }
      case 'Escape':
        evento.preventDefault();
        this.fechar();
        break;
    }
  }
}
