import {
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '@app/shared/components/icon/icon';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { getLocalDateInput } from '@core/utils/date-utils';
import { PrescriptionStatus, type Patient } from '@domain/entities';
import { PatientFindById, PrescriptionAdd } from '@domain/tokens';
import { MedicationCard, type MedicationChange } from './medication-card';
import { formatarNascimento, iniciais } from './patient-format';
import {
  LIMITE_ORIENTACOES_GERAIS,
  type MedicationDraft,
  type PrescriptionState,
  formatarParaPersistir,
  itemCompleto,
  medicamentoVazio,
} from './prescription-draft';
import { PrescriptionDraftStore } from './prescription-draft-store';
import { PrescriptionPreview } from './prescription-preview';

const ERRO_EMISSAO =
  'Não foi possível emitir a receita. Verifique os campos obrigatórios e tente novamente.';

/**
 * Nova receita. Todos os campos do medicamento são texto livre (ver
 * `prescription-draft.ts`); só nome, dose e frequência são exigidos pra
 * emitir. O rascunho fica no navegador (`PrescriptionDraftStore`) e só a
 * emissão grava no prontuário.
 *
 * `patientId` chega como query param, ver `ExamPage` para o racional.
 */
@Component({
  selector: 'app-prescription-page',
  imports: [Icon, MedicationCard, PrescriptionPreview, RouterLink],
  templateUrl: './prescription-page.html',
  styleUrl: './prescription-page.scss',
  host: { '(document:keydown.escape)': 'fecharModalPorTeclado()' },
})
export class PrescriptionPage {
  readonly patientId = input('');

  private readonly findPatient = inject(PatientFindById);
  private readonly addPrescription = inject(PrescriptionAdd);
  private readonly rascunhos = inject(PrescriptionDraftStore);
  private readonly toast = inject(ToastService);
  private readonly injector = inject(Injector);

  private readonly botaoEmitir = viewChild<ElementRef<HTMLButtonElement>>('botaoEmitir');
  private readonly modal = viewChild<ElementRef<HTMLElement>>('modal');

  private proximaChave = 1;

  protected readonly limiteOrientacoes = LIMITE_ORIENTACOES_GERAIS;

  protected readonly paciente = signal<Patient | null>(null);
  protected readonly medicamentos = signal<MedicationDraft[]>([medicamentoVazio('m0')]);
  protected readonly expandido = signal<string | null>('m0');
  protected readonly orientacoesGerais = signal('');
  protected readonly estado = signal<PrescriptionState>('RASCUNHO');
  /** Só destaca campos obrigatórios vazios depois da primeira tentativa de
   *  emissão — antes disso, vazio é só "ainda não preenchido". */
  protected readonly tentouEmitir = signal(false);
  protected readonly modalAberto = signal(false);
  protected readonly emitindo = signal(false);
  protected readonly ultimaAtualizacao = signal<Date | null>(null);
  protected readonly temAlteracoesNaoSalvas = signal(false);

  protected readonly emitida = computed(() => this.estado() === 'EMITIDA');
  protected readonly iniciais = computed(() => iniciais(this.paciente()?.name ?? ''));
  protected readonly nascimento = computed(() => {
    const p = this.paciente();
    return p ? formatarNascimento(p.birthday) : '';
  });
  protected readonly valida = computed(
    () => this.medicamentos().length > 0 && this.medicamentos().every(itemCompleto),
  );

  constructor() {
    effect(() => {
      const id = this.patientId();
      untracked(() => this.carregar(id));
    });
  }

  private carregar(id: string): void {
    this.paciente.set(null);
    this.estado.set('RASCUNHO');
    this.tentouEmitir.set(false);
    this.temAlteracoesNaoSalvas.set(false);
    this.ultimaAtualizacao.set(null);
    if (!id) return;

    this.findPatient.findById({ id }).then((paciente) => this.paciente.set(paciente));

    const salvo = this.rascunhos.load(id);
    if (salvo?.medicamentos.length) {
      this.medicamentos.set(salvo.medicamentos);
      this.orientacoesGerais.set(salvo.orientacoesGerais);
      this.expandido.set(salvo.medicamentos[0].key);
      this.ultimaAtualizacao.set(new Date(salvo.updatedAt));
      // Chaves do rascunho vieram de outra sessão; parte de um valor que
      // não colide com elas.
      this.proximaChave = Date.now();
    }
  }

  protected alterarMedicamento(key: string, { campo, valor }: MedicationChange): void {
    this.medicamentos.update((atual) =>
      atual.map((item) => (item.key === key ? { ...item, [campo]: valor } : item)),
    );
    this.marcarAlterado();
  }

  protected alternar(key: string): void {
    this.expandido.update((atual) => (atual === key ? null : key));
  }

  protected adicionarMedicamento(): void {
    const key = `m${this.proximaChave++}`;
    this.medicamentos.update((atual) => [...atual, medicamentoVazio(key)]);
    this.expandido.set(key);
    this.marcarAlterado();
    this.focarDepoisDeRenderizar(`medicamento-nome-${key}`);
  }

  protected removerMedicamento(key: string): void {
    this.medicamentos.update((atual) => atual.filter((item) => item.key !== key));
    if (this.expandido() === key) this.expandido.set(null);
    this.salvarRascunhoAutomaticamente();
  }

  private salvarRascunhoAutomaticamente(): void {
    const id = this.patientId();
    if (!id || this.estado() !== 'RASCUNHO') {
      this.marcarAlterado();
      return;
    }
    this.rascunhos.save(id, {
      medicamentos: this.medicamentos(),
      orientacoesGerais: this.orientacoesGerais(),
    });
    this.marcarAlterado();
  }

  /** Troca de lugar com o de baixo — ou com o de cima, se já for o último. */
  protected moverMedicamento(indice: number): void {
    this.medicamentos.update((atual) => {
      const alvo = indice === atual.length - 1 ? indice - 1 : indice + 1;
      const proximo = [...atual];
      [proximo[indice], proximo[alvo]] = [proximo[alvo], proximo[indice]];
      return proximo;
    });
    this.marcarAlterado();
  }

  protected editarOrientacoesGerais(evento: Event): void {
    this.orientacoesGerais.set((evento.target as HTMLTextAreaElement).value);
    this.marcarAlterado();
  }

  protected salvarRascunho(): void {
    const id = this.patientId();
    if (!id) return;
    const ok = this.rascunhos.save(id, {
      medicamentos: this.medicamentos(),
      orientacoesGerais: this.orientacoesGerais(),
    });
    if (ok) {
      this.marcarSalvo();
      this.toast.add('Rascunho salvo com sucesso.', ToastType.SUCESS);
    } else {
      this.toast.add('Não foi possível salvar o rascunho neste navegador.', ToastType.ERROR);
    }
  }

  protected formatarHora(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(data);
  }

  private marcarAlterado(): void {
    this.temAlteracoesNaoSalvas.set(true);
  }

  private marcarSalvo(): void {
    this.temAlteracoesNaoSalvas.set(false);
    this.ultimaAtualizacao.set(new Date());
  }

  protected visualizarPdf(): void {
    window.print();
  }

  protected solicitarEmissao(): void {
    this.tentouEmitir.set(true);
    if (!this.valida()) {
      this.toast.add(ERRO_EMISSAO, ToastType.ERROR);
      this.mostrarPrimeiroInvalido();
      return;
    }
    this.modalAberto.set(true);
    afterNextRender(
      () => this.modal()?.nativeElement.querySelector<HTMLElement>('[data-foco-inicial]')?.focus(),
      { injector: this.injector },
    );
  }

  protected cancelarEmissao(): void {
    this.modalAberto.set(false);
    this.botaoEmitir()?.nativeElement.focus();
  }

  protected fecharModalPorTeclado(): void {
    if (this.modalAberto() && !this.emitindo()) this.cancelarEmissao();
  }

  /** Mantém o Tab dentro do modal enquanto ele estiver aberto. */
  protected prenderFoco(evento: KeyboardEvent): void {
    if (evento.key !== 'Tab') return;
    const focaveis = this.modal()?.nativeElement.querySelectorAll<HTMLElement>('button');
    if (!focaveis?.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    if (evento.shiftKey && document.activeElement === primeiro) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }

  protected async confirmarEmissao(imprimir: boolean): Promise<void> {
    const patientId = this.patientId();
    if (!patientId) return;
    this.emitindo.set(true);
    try {
      const data = getLocalDateInput() as unknown as Date;
      for (const item of this.medicamentos()) {
        await this.addPrescription.store({
          data: {
            id: '',
            patientId,
            medicament: formatarParaPersistir(item),
            date: data,
            status: PrescriptionStatus.ADMINISTERING,
          },
        });
      }
      this.rascunhos.clear(patientId);
      this.estado.set('EMITIDA');
      this.modalAberto.set(false);
      this.toast.add('Receita emitida com sucesso.', ToastType.SUCESS);
      // Imprime só depois do modal sair da tela, senão ele entra na
      // captura da janela de impressão em alguns navegadores.
      afterNextRender(() => (imprimir ? window.print() : undefined), { injector: this.injector });
    } catch {
      this.toast.add(ERRO_EMISSAO, ToastType.ERROR);
    } finally {
      this.emitindo.set(false);
    }
  }

  private mostrarPrimeiroInvalido(): void {
    const invalido = this.medicamentos().find((item) => !itemCompleto(item));
    if (!invalido) {
      this.adicionarMedicamento();
      return;
    }
    this.expandido.set(invalido.key);
    const campo = !invalido.name.trim() ? 'nome' : !invalido.dose.trim() ? 'dose' : 'frequencia';
    this.focarDepoisDeRenderizar(`medicamento-${campo}-${invalido.key}`);
  }

  private focarDepoisDeRenderizar(id: string): void {
    afterNextRender(() => document.getElementById(id)?.focus(), { injector: this.injector });
  }
}
