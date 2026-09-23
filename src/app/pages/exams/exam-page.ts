import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { Icon } from '@app/shared/components/icon/icon';
import { PrintOutput } from '@app/shared/components/print-output/print-output';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { getLocalDateInput } from '@core/utils/date-utils';
import { ExamStatus } from '@domain/entities';
import { ExamAdd, PatientFindById } from '@domain/tokens';
import { CATALOGO_EXAMES } from './exam-catalog';

/**
 * Solicitação de exames — espelha `legacy/src/Presentation/Pages/Exame`.
 *
 * `patientId` chega como query param (`?patientId=...`), resolvido pelo
 * `withComponentInputBinding` do router — sem rota aninhada dedicada. Sem
 * paciente vinculado a tela ainda funciona como conferência/impressão da
 * solicitação, só o "Salvar" some, igual ao legado (`{id && <FormButtonSave>}`).
 */
@Component({
  selector: 'app-exam-page',
  imports: [Button, Icon, PrintOutput, RouterLink],
  templateUrl: './exam-page.html',
  styleUrl: './exam-page.scss',
})
export class ExamPage {
  readonly patientId = input('');

  private readonly findPatient = inject(PatientFindById);
  private readonly addExam = inject(ExamAdd);
  private readonly toast = inject(ToastService);

  protected readonly catalogo = CATALOGO_EXAMES;
  protected readonly categoriaAberta = signal<string | null>(null);
  protected readonly selecionados = signal(new Set<string>());
  protected readonly outrosTexto = signal('');
  protected readonly nomePaciente = signal('');
  protected readonly salvando = signal(false);

  protected readonly outros = computed(() =>
    this.outrosTexto()
      .split('\n')
      .map((linha) => linha.trim())
      .filter(Boolean),
  );

  protected readonly todosSelecionados = computed(() => [
    ...this.selecionados(),
    ...this.outros(),
  ]);

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

  protected alternarExame(nome: string): void {
    this.selecionados.update((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(nome)) proximo.delete(nome);
      else proximo.add(nome);
      return proximo;
    });
  }

  protected limpar(): void {
    this.selecionados.set(new Set());
    this.outrosTexto.set('');
    this.toast.add('Limpo', ToastType.SUCESS);
  }

  protected async salvar(): Promise<void> {
    const patientId = this.patientId();
    const nomes = this.todosSelecionados();
    if (!patientId || !nomes.length) {
      this.toast.add('Selecione ao menos um exame');
      return;
    }
    this.salvando.set(true);
    try {
      for (const name of nomes) {
        await this.addExam.store({
          data: {
            id: '',
            patientId,
            name,
            requisitionDate: getLocalDateInput() as unknown as Date,
            status: ExamStatus.IN_PROGRESS,
          },
        });
      }
      this.toast.add(
        `Exames vinculados ao paciente ${this.nomePaciente()}`,
        ToastType.SUCESS,
      );
      this.selecionados.set(new Set());
      this.outrosTexto.set('');
    } catch {
      this.toast.add(
        'Não foi possível vincular os exames ao paciente, tente novamente mais tarde',
        ToastType.ERROR,
      );
    } finally {
      this.salvando.set(false);
    }
  }
}
