import { Component, computed, inject, input, output, signal } from '@angular/core';
import { Icon } from '@app/shared/components/icon/icon';
import { Letterhead } from '@app/shared/components/letterhead/letterhead';
import { PaperSizePicker } from '@app/shared/components/paper-size-picker/paper-size-picker';
import { nomeComTitulo } from '@app/shared/components/print-output/print-output';
import { AuthService } from '@app/shared/services/auth';
import { formatarNascimento } from '@app/shared/utils/patient-format';
import type { Patient } from '@domain/entities';

type Aba = 'previa' | 'impressao';

export type ExamPreviewItem = { nome: string; categoria: string };

const FORMATO_DATA: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

/**
 * Pré-visualização da requisição de exames como documento — mirror de
 * `PrescriptionPreview`. Também é o que sai na impressão: a página esconde
 * todo o resto via `@media print`, e a folha aparece mesmo com a aba
 * "Impressão" selecionada.
 */
@Component({
  selector: 'app-exam-preview',
  imports: [Icon, Letterhead, PaperSizePicker],
  templateUrl: './exam-preview.html',
  styleUrl: './exam-preview.scss',
})
export class ExamPreview {
  readonly paciente = input<Patient | null>(null);
  readonly itens = input<ExamPreviewItem[]>([]);
  readonly outros = input<string[]>([]);

  readonly imprimir = output<void>();

  private readonly usuario = inject(AuthService).usuarioAtual;

  /** Acima disso a lista vai para duas colunas, para ocupar menos folhas. */
  protected readonly limiteUmaColuna = 10;

  protected readonly aba = signal<Aba>('previa');

  protected readonly nomeProfissional = computed(() => nomeComTitulo(this.usuario()));
  protected readonly especialidade = computed(() => this.usuario()?.specialty ?? '');
  protected readonly conselho = computed(() => {
    const c = this.usuario()?.council;
    return c ? `${c.type} ${c.number}` : '';
  });

  protected readonly nascimento = computed(() => {
    const p = this.paciente();
    return p ? formatarNascimento(p.birthday) : '';
  });

  protected readonly data = new Intl.DateTimeFormat('pt-BR', FORMATO_DATA).format(new Date());

  protected selecionar(aba: Aba): void {
    this.aba.set(aba);
  }

  protected navegarAbas(evento: KeyboardEvent): void {
    if (evento.key !== 'ArrowLeft' && evento.key !== 'ArrowRight') return;
    evento.preventDefault();
    const proxima: Aba = this.aba() === 'previa' ? 'impressao' : 'previa';
    this.aba.set(proxima);
    document.getElementById(`aba-${proxima}`)?.focus();
  }
}
