import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { Icon } from '@app/shared/components/icon/icon';
import { Odontogram } from '@app/shared/components/odontogram/odontogram';
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
  imports: [Button, Icon, Odontogram, PrintOutput, RouterLink],
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
  /** Dentes marcados no odontograma, pela numeração FDI — vira item da
   *  lista de exames como "Odontograma — Dente NN" no computed abaixo. */
  protected readonly dentesSelecionados = signal(new Set<number>());
  protected readonly outrosTexto = signal('');
  protected readonly nomePaciente = signal('');
  protected readonly salvando = signal(false);
  /** Fica `true` depois de salvar, até o usuário mexer na seleção ou no
   *  texto de novo — trava o botão pra não duplicar o registro enquanto os
   *  dados continuam na tela só pra permitir imprimir em seguida. */
  protected readonly salvo = signal(false);

  protected readonly outros = computed(() =>
    this.outrosTexto()
      .split('\n')
      .map((linha) => linha.trim())
      .filter(Boolean),
  );

  protected readonly dentesRotulados = computed(() =>
    [...this.dentesSelecionados()]
      .sort((a, b) => a - b)
      .map((dente) => `Odontograma — Dente ${dente}`),
  );

  protected readonly todosSelecionados = computed(() => [
    ...this.selecionados(),
    ...this.dentesRotulados(),
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
    this.salvo.set(false);
  }

  protected alternarDente(dente: number): void {
    this.dentesSelecionados.update((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(dente)) proximo.delete(dente);
      else proximo.add(dente);
      return proximo;
    });
    this.salvo.set(false);
  }

  protected editarOutros(valor: string): void {
    this.outrosTexto.set(valor);
    this.salvo.set(false);
  }

  protected limpar(): void {
    this.selecionados.set(new Set());
    this.dentesSelecionados.set(new Set());
    this.outrosTexto.set('');
    this.salvo.set(false);
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
      // Sem limpar o formulário: os dados continuam na tela pra dar tempo
      // de imprimir a solicitação salva antes de começar a próxima.
      this.salvo.set(true);
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
