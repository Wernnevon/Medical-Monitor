import { Component, computed, inject, input } from '@angular/core';
import { AuthService } from '@app/shared/services/auth';
import { ProfessionalGender, ProfessionalRole, type Professional } from '@domain/entities';
import { Icon } from '../icon/icon';

const PREFIXO_POR_GENERO: Record<ProfessionalGender, string> = {
  [ProfessionalGender.MASCULINO]: 'Dr. ',
  [ProfessionalGender.FEMININO]: 'Dra. ',
};

const FORMATO_DATA_EXTENSO: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

/**
 * Papel timbrado impresso — espelha `legacy/src/Presentation/Components/output`.
 *
 * O cabeçalho (médico, especialidade, conselho, telefone) vem da sessão
 * autenticada: agora que existe cadastro de profissional, mostrar um nome
 * fictício ali seria pior do que não ter cabeçalho nenhum — quem imprime
 * uma receita ou atestado precisa que o papel identifique quem de fato
 * emitiu. Não há campo de endereço na entidade `Professional`, então essa
 * linha do timbrado legado foi removida em vez de preenchida com dado falso.
 *
 * `imprimir` dispara `window.print()`; o botão de imprimir e tudo fora deste
 * cartão saem da impressão via `@media print` no host.
 */
@Component({
  selector: 'app-print-output',
  imports: [Icon],
  templateUrl: './print-output.html',
  styleUrl: './print-output.scss',
})
export class PrintOutput {
  readonly patientName = input('');

  private readonly usuario = inject(AuthService).usuarioAtual;

  protected readonly nomeMedico = computed(() => nomeComTitulo(this.usuario()).toUpperCase());

  protected readonly especialidade = computed(() => this.usuario()?.specialty?.toUpperCase() ?? '');

  protected readonly conselho = computed(() => {
    const c = this.usuario()?.council;
    return c ? `${c.type}: ${c.number}` : '';
  });

  protected readonly telefone = computed(() => this.usuario()?.phone ?? '');

  /** Data/hora de emissão do documento, por extenso — capturada na criação
   *  do componente, não recalculada a cada render, então não muda entre a
   *  pré-visualização e a impressão de fato. */
  protected readonly dataEmissao = formatarDataExtenso(new Date());

  protected imprimir(): void {
    window.print();
  }
}

export function nomeComTitulo(u: Professional | null): string {
  if (!u) return '';
  // "Dr(a)." genérico só sobra pra cadastro antigo, de antes do campo de
  // gênero existir — daqui pra frente, todo profissional novo tem um.
  const prefixo =
    u.role === ProfessionalRole.PROFISSIONAL
      ? (u.gender && PREFIXO_POR_GENERO[u.gender]) || 'Dr(a). '
      : '';
  return `${prefixo}${u.name}`;
}

function formatarDataExtenso(data: Date): string {
  const texto = new Intl.DateTimeFormat('pt-BR', FORMATO_DATA_EXTENSO).format(data);
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
