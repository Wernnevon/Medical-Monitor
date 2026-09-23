import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { Icon } from '@app/shared/components/icon/icon';
import { PrintOutput } from '@app/shared/components/print-output/print-output';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { getLocalDateInput } from '@core/utils/date-utils';
import { PrescriptionStatus } from '@domain/entities';
import { PatientFindById, PrescriptionAdd } from '@domain/tokens';
import { CATALOGO_MEDICAMENTOS } from './prescription-catalog';

/**
 * Prescrição de receita — espelha `legacy/src/Presentation/Pages/Prescription`,
 * com um checklist de medicações comuns a mais (o legado só tinha texto
 * livre). `patientId` chega como query param, ver `ExamPage` para o racional.
 */
@Component({
  selector: 'app-prescription-page',
  imports: [Button, Icon, PrintOutput, RouterLink],
  templateUrl: './prescription-page.html',
  styleUrl: './prescription-page.scss',
})
export class PrescriptionPage {
  readonly patientId = input('');

  private readonly findPatient = inject(PatientFindById);
  private readonly addPrescription = inject(PrescriptionAdd);
  private readonly toast = inject(ToastService);

  protected readonly catalogo = CATALOGO_MEDICAMENTOS;
  protected readonly categoriaAberta = signal<string | null>(null);
  protected readonly selecionados = signal(new Set<string>());
  protected readonly medicamentosTexto = signal('');
  protected readonly nomePaciente = signal('');
  protected readonly salvando = signal(false);
  /** Fica `true` depois de salvar, até o usuário mexer na seleção ou no
   *  texto de novo — trava o botão pra não duplicar o registro enquanto os
   *  dados continuam na tela só pra permitir imprimir em seguida. */
  protected readonly salvo = signal(false);

  protected readonly outros = computed(() =>
    this.medicamentosTexto()
      .split('\n')
      .map((linha) => linha.trim())
      .filter(Boolean),
  );

  protected readonly medicamentos = computed(() => [...this.selecionados(), ...this.outros()]);

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

  protected alternarCategoria(tipo: string): void {
    this.categoriaAberta.set(this.categoriaAberta() === tipo ? null : tipo);
  }

  protected alternarMedicamento(nome: string): void {
    this.selecionados.update((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(nome)) proximo.delete(nome);
      else proximo.add(nome);
      return proximo;
    });
    this.salvo.set(false);
  }

  protected editarTexto(valor: string): void {
    this.medicamentosTexto.set(valor);
    this.salvo.set(false);
  }

  protected limpar(): void {
    this.selecionados.set(new Set());
    this.medicamentosTexto.set('');
    this.salvo.set(false);
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
      // Sem limpar o formulário: os dados continuam na tela pra dar tempo
      // de imprimir a receita salva antes de começar a próxima.
      this.salvo.set(true);
    } catch {
      this.toast.add(
        'Não foi possível vincular os medicamentos ao paciente, tente novamente mais tarde',
        ToastType.ERROR,
      );
    } finally {
      this.salvando.set(false);
    }
  }
}
