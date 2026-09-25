import { Component, computed, inject, input, output, signal } from '@angular/core';
import { Icon } from '@app/shared/components/icon/icon';
import { Letterhead } from '@app/shared/components/letterhead/letterhead';
import { PaperSizePicker } from '@app/shared/components/paper-size-picker/paper-size-picker';
import { nomeComTitulo } from '@app/shared/components/print-output/print-output';
import { AuthService } from '@app/shared/services/auth';
import { formatarNascimento } from '@app/shared/utils/patient-format';
import { TIPOS_ATESTADO, diasPorExtenso, formatarData, type AtestadoForm } from './certificate-form';

type Aba = 'previa' | 'impressao';

const FORMATO_DATA: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

/**
 * Pré-visualização do atestado como documento — mirror de `ExamPreview`.
 * Também é o que sai na impressão: a página esconde todo o resto via
 * `@media print`, e a folha aparece mesmo com a aba "Impressão" selecionada.
 */
@Component({
  selector: 'app-certificate-preview',
  imports: [Icon, Letterhead, PaperSizePicker],
  templateUrl: './certificate-preview.html',
  styleUrl: './certificate-preview.scss',
})
export class CertificatePreview {
  readonly form = input.required<AtestadoForm>();

  readonly imprimir = output<void>();

  private readonly usuario = inject(AuthService).usuarioAtual;

  protected readonly aba = signal<Aba>('previa');

  protected readonly nomeProfissional = computed(() => nomeComTitulo(this.usuario()));
  protected readonly especialidade = computed(() => this.usuario()?.specialty ?? '');
  protected readonly conselho = computed(() => {
    const c = this.usuario()?.council;
    return c ? `${c.type} ${c.number}` : '';
  });

  protected readonly nascimento = computed(() => formatarNascimento(this.form().nascimento));

  protected readonly tipo = computed(() => TIPOS_ATESTADO.find((t) => t.valor === this.form().tipo));
  protected readonly dias = computed(() => diasPorExtenso(Number(this.form().dias)));
  protected readonly inicio = computed(() => formatarData(this.form().inicio));
  protected readonly fim = computed(() => formatarData(this.form().fim));

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
