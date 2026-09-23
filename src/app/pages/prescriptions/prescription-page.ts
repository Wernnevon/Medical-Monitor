import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { Icon } from '@app/shared/components/icon/icon';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { getLocalDateInput } from '@core/utils/date-utils';
import { PrescriptionStatus } from '@domain/entities';
import { PatientFindById, PrescriptionAdd } from '@domain/tokens';

/**
 * Prescrição de receita — espelha `legacy/src/Presentation/Pages/Prescription`.
 * `patientId` chega como query param, ver `ExamPage` para o racional.
 */
@Component({
  selector: 'app-prescription-page',
  imports: [Button, Icon, RouterLink],
  templateUrl: './prescription-page.html',
  styleUrl: './prescription-page.scss',
})
export class PrescriptionPage {
  readonly patientId = input('');

  private readonly findPatient = inject(PatientFindById);
  private readonly addPrescription = inject(PrescriptionAdd);
  private readonly toast = inject(ToastService);

  protected readonly medicamentosTexto = signal('');
  protected readonly nomePaciente = signal('');
  protected readonly salvando = signal(false);

  protected readonly medicamentos = computed(() =>
    this.medicamentosTexto()
      .split('\n')
      .map((linha) => linha.trim())
      .filter(Boolean),
  );

  constructor() {
    effect(() => {
      const id = this.patientId();
      if (!id) {
        this.nomePaciente.set('');
        return;
      }
      this.findPatient.findById({ id }).then((paciente) => {
        this.nomePaciente.set(paciente.name);
      });
    });
  }

  protected limpar(): void {
    this.medicamentosTexto.set('');
    this.toast.add('Limpo', ToastType.SUCESS);
  }

  protected async salvar(): Promise<void> {
    const patientId = this.patientId();
    const medicamentos = this.medicamentos();
    if (!patientId || !medicamentos.length) {
      this.toast.add('Prescreva algo');
      return;
    }
    this.salvando.set(true);
    try {
      for (const medicament of medicamentos) {
        await this.addPrescription.store({
          data: {
            id: '',
            patientId,
            medicament,
            date: getLocalDateInput() as unknown as Date,
            status: PrescriptionStatus.ADMINISTERING,
          },
        });
      }
      this.toast.add(
        `Medicamentos vinculados ao paciente ${this.nomePaciente()}`,
        ToastType.SUCESS,
      );
      this.medicamentosTexto.set('');
    } catch {
      this.toast.add(
        'Não foi possível vincular os medicamentos ao paciente, tente novamente mais tarde',
        ToastType.ERROR,
      );
    } finally {
      this.salvando.set(false);
    }
  }

  protected imprimir(): void {
    window.print();
  }
}
