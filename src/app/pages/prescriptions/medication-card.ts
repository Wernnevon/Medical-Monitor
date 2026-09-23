import { Component, computed, input, output, signal } from '@angular/core';
import { Icon } from '@app/shared/components/icon/icon';
import { Tooltip, TooltipTriggerDirective } from '@app/shared/components/tooltip';
import { InputMaskDirective } from '@app/shared/directives';
import {
  LIMITE_ORIENTACOES_ITEM,
  SUGESTOES,
  type MedicationDraft,
  type MedicationField,
  resumo,
} from './prescription-draft';

export type MedicationChange = { campo: MedicationField; valor: string };

/**
 * Um bloco de medicamento da receita. Os campos com sugestão usam
 * `<datalist>`: o profissional vê as opções comuns, mas continua podendo
 * digitar qualquer coisa — sugestão é assistência, não requisito.
 */
@Component({
  selector: 'app-medication-card',
  imports: [Icon, Tooltip, TooltipTriggerDirective, InputMaskDirective],
  templateUrl: './medication-card.html',
  styleUrl: './medication-card.scss',
})
export class MedicationCard {
  readonly item = input.required<MedicationDraft>();
  readonly indice = input.required<number>();
  readonly expandido = input(false);
  readonly mostrarErros = input(false);
  readonly podeMover = input(false);
  readonly somenteLeitura = input(false);
  readonly podeSalvarRascunho = input(false);

  readonly alterado = output<MedicationChange>();
  readonly alternar = output<void>();
  readonly remover = output<void>();
  readonly mover = output<void>();
  readonly salvarRascunho = output<void>();

  protected readonly sugestoes = SUGESTOES;
  protected readonly limiteOrientacoes = LIMITE_ORIENTACOES_ITEM;

  protected readonly id = computed(() => this.item().key);
  protected readonly resumo = computed(() => resumo(this.item()));
  protected readonly titulo = computed(() => this.item().name.trim() || 'Novo medicamento');

  protected readonly tooltipVisivel = signal<Record<string, boolean>>({});

  protected marcarTooltip(campo: string, visivel: boolean): void {
    this.tooltipVisivel.update((atual) => ({ ...atual, [campo]: visivel }));
  }

  protected readonly erroNome = computed(() => this.mostrarErros() && !this.item().name.trim());
  protected readonly erroDose = computed(() => this.mostrarErros() && !this.item().dose.trim());
  protected readonly erroFrequencia = computed(
    () => this.mostrarErros() && !this.item().frequency.trim(),
  );

  protected editar(campo: MedicationField, evento: Event): void {
    const alvo = evento.target as HTMLInputElement | HTMLTextAreaElement;
    this.alterado.emit({ campo, valor: alvo.value });
  }

  protected limparNome(): void {
    this.alterado.emit({ campo: 'name', valor: '' });
    document.getElementById(`medicamento-nome-${this.id()}`)?.focus();
  }
}
