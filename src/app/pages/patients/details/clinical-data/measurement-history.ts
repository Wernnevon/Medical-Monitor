import { Component, computed, inject, input, output, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Icon } from '@app/shared/components/icon/icon';
import { Select, type SelectOption } from '@app/shared/components/select/select';
import { PopupService } from '@app/shared/services/popup';
import { ToastService, ToastType } from '@app/shared/services/toast';
import type { Patient } from '@domain/entities';
import { TokenPatientRemoveReading } from '@domain/tokens';
import {
  MEASUREMENT_TYPES,
  formatMeasurementValue,
  splitMeasuredAt,
  type PatientReading,
} from './measurement-types';

const TIPO_OPCOES: SelectOption[] = [
  { value: 'todas', label: 'Todas as medidas' },
  ...MEASUREMENT_TYPES.map((tipo) => ({ value: tipo.kind, label: tipo.label })),
];

const PERIODO_OPCOES: SelectOption[] = [
  { value: 'tudo', label: 'Todo o período' },
  { value: '7', label: 'Últimos 7 dias' },
  { value: '30', label: 'Últimos 30 dias' },
  { value: '90', label: 'Últimos 90 dias' },
];

/** Data local de `dias` atrás em `AAAA-MM-DD`, comparável com `measuredAt`. */
function inicioDoPeriodo(dias: number): string {
  const inicio = new Date();
  inicio.setDate(inicio.getDate() - dias);
  const mes = String(inicio.getMonth() + 1).padStart(2, '0');
  const dia = String(inicio.getDate()).padStart(2, '0');
  return `${inicio.getFullYear()}-${mes}-${dia}`;
}

type Linha = PatientReading & { data: string; hora: string; valor: string };

/**
 * Histórico único de todas as medidas, mais recente primeiro. A única ação
 * por linha é excluir — um ícone discreto, com confirmação antes de remover.
 */
@Component({
  selector: 'app-measurement-history',
  imports: [Icon, Select],
  templateUrl: './measurement-history.html',
  styleUrl: './measurement-history.scss',
})
export class MeasurementHistory {
  readonly patient = input.required<Patient>();
  readonly readings = input.required<PatientReading[]>();
  readonly removed = output<void>();

  private readonly removeReading = inject(TokenPatientRemoveReading);
  private readonly popup = inject(PopupService);
  private readonly toast = inject(ToastService);

  /** Sem schema — são selects sem validação, então basta o `form()` como
   *  fonte de um FieldTree pro `app-select` escrever. */
  protected readonly tipoOpcoes = TIPO_OPCOES;
  protected readonly periodoOpcoes = PERIODO_OPCOES;
  private readonly filtroModelo = signal({ tipo: 'todas', periodo: 'tudo' });
  protected readonly filtroForm = form(this.filtroModelo);

  protected readonly linhas = computed<Linha[]>(() =>
    this.readings().map((item) => ({
      ...item,
      ...splitMeasuredAt(item.reading.measuredAt),
      valor: formatMeasurementValue(item.type, item.reading.value),
    })),
  );

  protected readonly filtradas = computed(() => {
    const { tipo, periodo } = this.filtroModelo();
    const inicio = periodo === 'tudo' ? '' : inicioDoPeriodo(Number(periodo));
    return this.linhas().filter(
      (linha) =>
        (tipo === 'todas' || linha.type.kind === tipo) &&
        linha.reading.measuredAt.slice(0, 10) >= inicio,
    );
  });

  protected excluir(linha: Linha): void {
    this.popup.show({
      data: {
        title: 'Excluir registro?',
        message: `Remover ${linha.type.label} (${linha.valor}) de ${linha.data} às ${linha.hora}? Não há como desfazer esta ação!`,
      },
      onConfirm: async () => {
        try {
          await this.removeReading.remove({
            patientId: this.patient().id,
            kind: linha.type.kind,
            reading: linha.reading,
          });
          this.toast.add('Registro removido', ToastType.SUCESS);
          this.removed.emit();
        } catch {
          this.toast.add('Não foi possível remover o registro', ToastType.ERROR);
        }
      },
    });
  }
}
