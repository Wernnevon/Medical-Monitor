import { Component, computed, inject, input, output, signal } from '@angular/core';
import {
  FormField,
  form,
  required,
  submit,
  validate,
  type FieldTree,
} from '@angular/forms/signals';
import { Button } from '@app/shared/components/button/button';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { getLocalDateInput, getLocalTimeInput } from '@core/utils/date-utils';
import type { Patient } from '@domain/entities';
import { TokenPatientAddReading } from '@domain/tokens';
import type { ReadingKind } from '@domain/use-cases';
import { MEASUREMENT_TYPES, measurementType } from './measurement-types';

type MedidaForm = { data: string; hora: string; valor: string };

// Começa preenchido com a data/hora atuais — a aferição normalmente
// acontece na hora de registrar, então digitar isso toda vez seria atrito
// sem propósito; quem estiver registrando algo passado ainda pode editar.
const novaMedida = (): MedidaForm => ({
  data: getLocalDateInput(),
  hora: getLocalTimeInput(),
  valor: '',
});

/**
 * Formulário único de registro — o tipo escolhido no seletor define rótulo,
 * unidade, máscara e validação do campo de valor (ver `MEASUREMENT_TYPES`),
 * no lugar dos quatro blocos repetidos de data/horário/valor que existiam.
 */
@Component({
  selector: 'app-measurement-form',
  imports: [Button, FormField],
  templateUrl: './measurement-form.html',
  styleUrl: './measurement-form.scss',
})
export class MeasurementForm {
  readonly patient = input.required<Patient>();
  readonly registered = output<void>();

  private readonly addReading = inject(TokenPatientAddReading);
  private readonly toast = inject(ToastService);

  protected readonly tipos = MEASUREMENT_TYPES;
  protected readonly tipo = signal<ReadingKind>(MEASUREMENT_TYPES[0].kind);
  protected readonly tipoAtual = computed(() => measurementType(this.tipo()));

  private readonly modelo = signal(novaMedida());
  protected readonly formulario = form(this.modelo, (p) => {
    required(p.data, { message: 'Informe a data' });
    required(p.hora, { message: 'Informe o horário' });
    required(p.valor, { message: 'Informe o valor' });
    validate(p.valor, ({ value }) => {
      const erro = value() ? this.tipoAtual().validate(value()) : null;
      return erro ? { kind: 'medida', message: erro } : undefined;
    });
  });

  /** Troca de tipo zera só o valor — a máscara e a unidade mudam, mas a
   *  data e o horário continuam valendo pra próxima medida. */
  protected selecionarTipo(kind: ReadingKind): void {
    this.tipo.set(kind);
    this.formulario.valor().value.set('');
    this.formulario.valor().reset();
  }

  protected aplicarMascara(evento: Event): void {
    const alvo = evento.target as HTMLInputElement;
    const formatado = this.tipoAtual().mask(alvo.value);
    if (formatado === alvo.value) return;
    alvo.value = formatado;
    this.formulario.valor().value.set(formatado);
  }

  /** Mensagem de erro do campo, só depois que ele foi tocado ou submetido. */
  protected erro(campo: FieldTree<string>): string | null {
    const estado = campo();
    if (!estado.touched() || !estado.errors().length) return null;
    return estado.errors()[0].message ?? 'Campo inválido';
  }

  protected async registrar(evento: Event): Promise<void> {
    evento.preventDefault();
    const paciente = this.patient();
    const tipo = this.tipoAtual();

    await submit(this.formulario, async (f) => {
      const { data, hora, valor } = f().value();
      try {
        await this.addReading.add({
          patientId: paciente.id,
          kind: tipo.kind,
          reading: { id: crypto.randomUUID(), measuredAt: `${data}T${hora}`, value: valor.trim() },
        });
        this.formulario().reset(novaMedida());
        this.toast.add(`Medida registrada: ${tipo.label}`, ToastType.SUCESS);
        this.registered.emit();
      } catch {
        this.toast.add('Não foi possível registrar a medida', ToastType.ERROR);
      }
      return undefined;
    });
  }
}
