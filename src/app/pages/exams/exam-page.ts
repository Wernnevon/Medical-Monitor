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
import { Odontogram, dentesDaDenticao, type Denticao } from '@app/shared/components/odontogram/odontogram';
import { AuthService } from '@app/shared/services/auth';
import { PopupService } from '@app/shared/services/popup';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { formatarNascimento, iniciais } from '@app/shared/utils/patient-format';
import { getLocalDateInput } from '@core/utils/date-utils';
import { ExamStatus, type Patient } from '@domain/entities';
import { ExamAdd, PatientFindById } from '@domain/tokens';
import { LIMITE_OUTROS_EXAMES, type ExamState } from './exam-draft';
import { ExamDraftStore } from './exam-draft-store';
import { catalogoDoConselho, denticaoDoOdontograma, type CategoriaExame } from './exam-catalog';
import type { IconName } from '@app/shared/components/icon/icons';
import { ExamPreview, type ExamPreviewItem } from './exam-preview';

const CATEGORIA_TODOS = 'Todos';
type Painel = {
  titulo: string;
  icone: IconName;
  grupos: CategoriaExame[];
  total: number;
};

function contar(grupos: CategoriaExame[]): number {
  return grupos.reduce((soma, g) => soma + g.exames.length, 0);
}

const ERRO_EMISSAO =
  'Não foi possível emitir a requisição. Verifique se há ao menos um exame selecionado e tente novamente.';

/**
 * Solicitação de exames — mirror de `PrescriptionPage`, trocando a edição
 * de medicamentos por um catálogo com busca/pills e checklist. `patientId`
 * chega como query param, ver `PrescriptionPage` para o racional.
 */
@Component({
  selector: 'app-exam-page',
  imports: [Icon, Odontogram, ExamPreview, RouterLink],
  templateUrl: './exam-page.html',
  styleUrl: './exam-page.scss',
  host: { '(document:keydown.escape)': 'fecharModalPorTeclado()' },
})
export class ExamPage {
  readonly patientId = input('');

  private readonly findPatient = inject(PatientFindById);
  private readonly addExam = inject(ExamAdd);
  private readonly rascunhos = inject(ExamDraftStore);
  private readonly toast = inject(ToastService);
  private readonly popup = inject(PopupService);
  private readonly injector = inject(Injector);
  private readonly usuario = inject(AuthService).usuarioAtual;

  private readonly botaoEmitir = viewChild<ElementRef<HTMLButtonElement>>('botaoEmitir');
  private readonly botaoNovaSolicitacao =
    viewChild<ElementRef<HTMLButtonElement>>('botaoNovaSolicitacao');
  private readonly modal = viewChild<ElementRef<HTMLElement>>('modal');
  private readonly modalNovaSolicitacao = viewChild<ElementRef<HTMLElement>>('modalNovaSolicitacao');

  protected readonly limiteOutros = LIMITE_OUTROS_EXAMES;
  protected readonly todos = CATEGORIA_TODOS;

  private readonly catalogoConselho = computed(() => catalogoDoConselho(this.usuario()?.council?.type));
  protected readonly catalogo = computed(() => this.catalogoConselho().categorias);
  /** Só preenchido para conselhos que não solicitam exames clínicos. */
  protected readonly avisoConselho = computed(() => this.catalogoConselho().aviso);

  protected readonly categorias = computed<{ tipo: string; icone: IconName; total: number | null }[]>(() => [
    ...this.catalogo().map((c) => ({ tipo: c.tipo, icone: c.icone, total: c.exames.length })),
  ]);

  private readonly categoriaPorExame = computed(
    () => new Map(this.catalogo().flatMap((c) => c.exames.map((nome) => [nome, c.tipo] as const))),
  );

  protected readonly paciente = signal<Patient | null>(null);
  protected readonly categoriaAtiva = signal(CATEGORIA_TODOS);
  protected readonly busca = signal('');
  protected readonly selecionados = signal(new Set<string>());
  /** Odontograma escolhido no catálogo — fica fora de `selecionados`
   *  porque é exclusivo (um tipo por requisição) e carrega os dentes. */
  protected readonly odontograma = signal<string | null>(null);
  /** Dentes marcados no odontograma, pela numeração FDI: são o detalhe do
   *  único item de odontograma, não exames soltos na lista. */
  protected readonly dentesSelecionados = signal(new Set<number>());
  protected readonly outrosTexto = signal('');
  protected readonly estado = signal<ExamState>('RASCUNHO');
  /** Só destaca a falta de exames depois da primeira tentativa de emissão —
   *  antes disso, vazio é só "ainda não preenchido". */
  protected readonly tentouEmitir = signal(false);
  protected readonly modalAberto = signal(false);
  protected readonly modalNovaSolicitacaoAberto = signal(false);
  protected readonly emitindo = signal(false);

  protected readonly emitida = computed(() => this.estado() === 'EMITIDA');
  protected readonly iniciais = computed(() => iniciais(this.paciente()?.name ?? ''));
  protected readonly nascimento = computed(() => {
    const p = this.paciente();
    return p ? formatarNascimento(p.birthday) : '';
  });

  protected readonly outros = computed(() =>
    this.outrosTexto()
      .split('\n')
      .map((linha) => linha.trim())
      .filter(Boolean),
  );

  /** Um item só pro odontograma inteiro, não um por dente — os dentes
   *  marcados viram o detalhe desse único exame na pré-visualização
   *  ("Odontograma — Dentes: 16, 36"), não vira N exames separados. */
  protected readonly odontogramaItem = computed(() => {
    const nome = this.odontograma();
    if (!nome) return null;
    const dentes = [...this.dentesSelecionados()].sort((a, b) => a - b);
    return dentes.length ? `${nome} — Dentes: ${dentes.join(', ')}` : nome;
  });

  protected readonly denticao = computed(() => {
    const nome = this.odontograma();
    return nome ? denticaoDoOdontograma(nome) : null;
  });

  protected readonly todosSelecionados = computed(() => [
    ...this.selecionados(),
    ...(this.odontogramaItem() ? [this.odontogramaItem()!] : []),
    ...this.outros(),
  ]);

  protected readonly valida = computed(() => this.todosSelecionados().length > 0);

  /** O que a coluna da direita mostra: a busca, quando há texto, vale para
   *  o catálogo inteiro e se sobrepõe à categoria escolhida. */
  protected readonly painel = computed<Painel>(() => {
    const termo = this.busca().trim();
    const categoria = this.categoriaAtiva();

    if (termo) {
      const minusculo = termo.toLowerCase();
      const grupos = this.catalogo()
        .map((c) => ({ ...c, exames: c.exames.filter((n) => n.toLowerCase().includes(minusculo)) }))
        .filter((c) => c.exames.length);
      return {
        titulo: `Resultados para “${termo}”`,
        icone: 'BsSearch',
        grupos,
        total: contar(grupos),
      };
    }
    if (categoria === CATEGORIA_TODOS) {
      return {
        titulo: 'Todos os exames',
        icone: 'LuFlaskConical',
        grupos: this.catalogo(),
        total: contar(this.catalogo()),
      };
    }
    const grupo = this.catalogo().find((c) => c.tipo === categoria)!;
    return { titulo: grupo.tipo, icone: grupo.icone, grupos: [grupo], total: grupo.exames.length };
  });

  protected readonly selecionadosPorCategoria = computed(() => {
    const contagem = new Map<string, number>();
    for (const nome of this.selecionados()) {
      const tipo = this.categoriaPorExame().get(nome);
      if (tipo) contagem.set(tipo, (contagem.get(tipo) ?? 0) + 1);
    }
    const odontograma = this.odontograma();
    const tipo = odontograma && this.categoriaPorExame().get(odontograma);
    if (tipo) contagem.set(tipo, (contagem.get(tipo) ?? 0) + 1);
    return contagem;
  });

  protected readonly itensPreview = computed<ExamPreviewItem[]>(() => {
    const itens = [...this.selecionados()].map((nome) => ({
      nome,
      categoria: this.categoriaPorExame().get(nome) ?? '',
    }));
    const odontograma = this.odontogramaItem();
    if (odontograma) {
      itens.push({ nome: odontograma, categoria: this.categoriaPorExame().get(this.odontograma()!) ?? '' });
    }
    return itens;
  });

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
    this.categoriaAtiva.set(CATEGORIA_TODOS);
    this.busca.set('');
    // Reseta pro estado vazio antes de olhar o rascunho do paciente novo —
    // sem isto, trocar de paciente sem rascunho salvo deixava na tela os
    // exames marcados (e não salvos) pro paciente anterior.
    this.selecionados.set(new Set());
    this.odontograma.set(null);
    this.dentesSelecionados.set(new Set());
    this.outrosTexto.set('');
    if (!id) return;

    this.findPatient.findById({ id }).then((paciente) => this.paciente.set(paciente));

    const salvo = this.rascunhos.load(id);
    if (salvo) {
      const disponiveis = this.categoriaPorExame();
      this.selecionados.set(
        new Set(salvo.selecionados.filter((n) => disponiveis.has(n) && !denticaoDoOdontograma(n))),
      );
      // Rascunhos de antes do odontograma vir do catálogo não têm `odontograma`.
      const odontograma = salvo.odontograma && disponiveis.has(salvo.odontograma) ? salvo.odontograma : null;
      this.odontograma.set(odontograma);
      if (odontograma) {
        const validos = dentesDaDenticao(denticaoDoOdontograma(odontograma)!);
        this.dentesSelecionados.set(new Set(salvo.dentes.filter((d) => validos.has(d))));
      }
      this.outrosTexto.set(salvo.outrosTexto);
    }
  }

  protected alternarCategoria(tipo: string): void {
    this.categoriaAtiva.set(tipo);
    this.busca.set('');
  }

  protected editarBusca(valor: string): void {
    this.busca.set(valor);
  }

  protected marcado(nome: string): boolean {
    return this.selecionados().has(nome) || this.odontograma() === nome;
  }

  protected alternarExame(nome: string): void {
    const denticao = denticaoDoOdontograma(nome);
    if (denticao) {
      this.alternarOdontograma(nome, denticao);
      return;
    }
    this.selecionados.update((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(nome)) proximo.delete(nome);
      else proximo.add(nome);
      return proximo;
    });
    this.salvarRascunhoAutomaticamente();
  }

  /** Um odontograma por requisição: marcar outro troca o anterior, e os
   *  dentes que não existem na nova dentição são descartados. */
  private alternarOdontograma(nome: string, denticao: Denticao): void {
    if (this.odontograma() === nome) {
      this.odontograma.set(null);
      this.dentesSelecionados.set(new Set());
    } else {
      const validos = dentesDaDenticao(denticao);
      this.odontograma.set(nome);
      this.dentesSelecionados.update((atual) => new Set([...atual].filter((d) => validos.has(d))));
      afterNextRender(
        () =>
          document
            .getElementById('titulo-odontograma')
            ?.closest('section')
            ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }),
        { injector: this.injector },
      );
    }
    this.salvarRascunhoAutomaticamente();
  }

  protected alternarDente(dente: number): void {
    this.dentesSelecionados.update((atual) => {
      const proximo = new Set(atual);
      if (proximo.has(dente)) proximo.delete(dente);
      else proximo.add(dente);
      return proximo;
    });
    this.salvarRascunhoAutomaticamente();
  }

  protected editarOutros(valor: string): void {
    this.outrosTexto.set(valor);
    this.salvarRascunhoAutomaticamente();
  }

  private salvarRascunhoAutomaticamente(): void {
    const id = this.patientId();
    if (!id || this.estado() !== 'RASCUNHO') return;
    this.rascunhos.save(id, {
      selecionados: [...this.selecionados()],
      odontograma: this.odontograma(),
      dentes: [...this.dentesSelecionados()],
      outrosTexto: this.outrosTexto(),
    });
  }

  protected limpar(): void {
    if (!this.todosSelecionados().length) return;
    this.popup.show({
      data: {
        title: 'Limpar seleção',
        message: 'Deseja remover todos os exames selecionados?',
        confirmLabel: 'Limpar exames',
        cancelLabel: 'Cancelar',
      },
      onConfirm: () => {
        this.selecionados.set(new Set());
        this.odontograma.set(null);
        this.dentesSelecionados.set(new Set());
        this.outrosTexto.set('');
        const id = this.patientId();
        if (id) this.rascunhos.clear(id);
        this.toast.add('Seleção de exames removida.', ToastType.SUCESS);
      },
    });
  }

  protected visualizarPdf(): void {
    window.print();
  }

  protected solicitarEmissao(): void {
    this.tentouEmitir.set(true);
    if (!this.valida()) {
      this.toast.add(ERRO_EMISSAO, ToastType.ERROR);
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
    else if (this.modalNovaSolicitacaoAberto()) this.cancelarNovaSolicitacao();
  }

  protected solicitarNovaSolicitacao(): void {
    this.modalNovaSolicitacaoAberto.set(true);
    afterNextRender(
      () =>
        this.modalNovaSolicitacao()
          ?.nativeElement.querySelector<HTMLElement>('[data-foco-inicial]')
          ?.focus(),
      { injector: this.injector },
    );
  }

  protected cancelarNovaSolicitacao(): void {
    this.modalNovaSolicitacaoAberto.set(false);
    this.botaoNovaSolicitacao()?.nativeElement.focus();
  }

  /** Não vincula à requisição emitida: o prontuário já guarda o registro
   *  anterior, então só reabrimos o rascunho pra próxima solicitação. */
  protected confirmarNovaSolicitacao(): void {
    this.modalNovaSolicitacaoAberto.set(false);
    this.carregar(this.patientId());
  }

  protected prenderFoco(evento: KeyboardEvent): void {
    this.prenderFocoEm(evento, this.modal()?.nativeElement);
  }

  protected prenderFocoNovaSolicitacao(evento: KeyboardEvent): void {
    this.prenderFocoEm(evento, this.modalNovaSolicitacao()?.nativeElement);
  }

  /** Mantém o Tab dentro do modal enquanto ele estiver aberto. */
  private prenderFocoEm(evento: KeyboardEvent, container: HTMLElement | undefined): void {
    if (evento.key !== 'Tab') return;
    const focaveis = container?.querySelectorAll<HTMLElement>('button');
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
      for (const name of this.todosSelecionados()) {
        await this.addExam.store({
          data: {
            id: '',
            patientId,
            name,
            requisitionDate: data,
            status: ExamStatus.IN_PROGRESS,
          },
        });
      }
      this.rascunhos.clear(patientId);
      this.estado.set('EMITIDA');
      this.modalAberto.set(false);
      this.toast.add('Requisição de exames emitida com sucesso.', ToastType.SUCESS);
      // Imprime só depois do modal sair da tela, senão ele entra na
      // captura da janela de impressão em alguns navegadores.
      afterNextRender(() => (imprimir ? window.print() : undefined), { injector: this.injector });
    } catch {
      this.toast.add(ERRO_EMISSAO, ToastType.ERROR);
    } finally {
      this.emitindo.set(false);
    }
  }

  /** Usado pelo `examLeaveGuard` — pede confirmação só quando há exames
   *  selecionados que ainda não foram emitidos. */
  confirmarSaida(): boolean | Promise<boolean> {
    if (this.emitida() || !this.todosSelecionados().length) return true;
    return new Promise<boolean>((resolve) => {
      this.popup.show({
        data: {
          title: 'Sair sem emitir?',
          message:
            'Existem exames selecionados que ainda não foram emitidos. Deseja sair mesmo assim?',
          confirmLabel: 'Sair sem emitir',
          cancelLabel: 'Continuar editando',
        },
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  }
}
