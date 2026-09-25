import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { Icon } from '@app/shared/components/icon/icon';
import { KebabMenu, type KebabItem } from '@app/shared/components/kebab-menu/kebab-menu';
import { Select, type SelectOption } from '@app/shared/components/select/select';
import { AuthService } from '@app/shared/services/auth';
import { PopupService } from '@app/shared/services/popup';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { Table, type DataColumn } from '@app/shared/components/table/table';
import { getAge, formmatDate } from '@core/utils/date-utils';
import type { Exams, Patient } from '@domain/entities';
import { ProfessionalRole } from '@domain/entities';
import {
  ExamChangeStatus,
  ExamFindById,
  ExamUpdate,
  PatientDelete,
  PatientUpdate,
  PrescriptionChangeStatus,
} from '@domain/tokens';
import { ClinicalData } from './clinical-data/clinical-data';
import { PatientDetailsFacade } from './patient-details-facade';

/**
 * Sem "Profissional" (quem atendeu) de propósito: essa coluna existe no
 * protótipo, mas o domínio não tem entidade de profissional nem vínculo
 * nenhum registro guarda quem atendeu, e os fluxos de criação de exame e
 * receita ainda nem existem no Angular pra alguém preencher isso. Adicionar
 * a coluna preenchida com traço seria pior que não ter a coluna.
 */
const HISTORICO_COLUMNS: DataColumn[] = [
  { name: 'Atendimento', key: 'titulo', type: 'text', width: '28%' },
  { name: 'Tipo', key: 'tipo', type: 'text', width: '12%' },
  { name: 'Data', key: 'data', type: 'text', width: '14%' },
  { name: 'Status', key: 'status', type: 'status', width: '16%', editable: true },
  { name: 'Atualizado em', key: 'atualizadoEmFormatado', type: 'text', width: '18%' },
  { name: '', key: 'action', type: 'action', width: '12%', align: 'center' },
];

/**
 * Página de detalhes do paciente — uma tela só, sem abas de rota. Dados
 * pessoais, anamnese e dados clínicos vivem dentro do card "Prontuário", em
 * sub-abas locais; "Últimos Atendimentos" é um card à parte, sempre visível,
 * com a linha do tempo mesclada de exames e receitas. Não há mais telas
 * dedicadas de Exames/Receitas/Atestados por paciente — Atestados nunca teve
 * contrapartida real no domínio (era impressão avulsa, sem vínculo com
 * paciente, no app anterior), e o "Ver mais" de Exames/Receitas manda pras
 * telas gerais dessas entidades, com o paciente pré-selecionado via query
 * param.
 */
@Component({
  selector: 'app-patient-details',
  imports: [Button, ClinicalData, Icon, KebabMenu, RouterLink, Select, Table],
  // Instância própria por navegação, mesmo a classe sendo `@Service()`
  // (`providedIn: 'root'`, singleton por padrão): sem isso, voltar pra cá
  // pro MESMO paciente (ex.: depois de registrar uma receita em `/receitas`)
  // reaproveita a instância antiga e o `effect` que seta `patientId` vira
  // um no-op — o valor não mudou — então o histórico nunca recarrega e
  // mostra dado velho. Um provider aqui força recriar o facade (e os
  // `resource()` dele) do zero a cada entrada na rota.
  providers: [PatientDetailsFacade],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.scss',
})
export class PatientDetails {
  readonly id = input.required<string>();

  protected readonly router = inject(Router);
  protected readonly facade = inject(PatientDetailsFacade);
  private readonly toast = inject(ToastService);
  private readonly popup = inject(PopupService);
  private readonly auth = inject(AuthService);

  /** Assistente não prescreve nem solicita exame — os atalhos somem, em vez
   *  de ficarem visíveis só para esbarrar no guard de rota. */
  protected readonly ehProfissional = computed(
    () => this.auth.usuarioAtual()?.role === ProfessionalRole.PROFISSIONAL,
  );

  protected readonly formatar = (data: unknown) =>
    data ? formmatDate(data as unknown as Date) : '—';

  protected readonly idade = computed(() => {
    const p = this.facade.patient();
    return p ? getAge(p.birthday) : null;
  });

  protected readonly ultimoAtendimento = computed(() => this.facade.historico()[0] ?? null);

  /** Filtro por tipo de atendimento na aba Histórico — sem schema, é só um
   *  select sem validação, então basta o `form()` como fonte de um FieldTree
   *  pro `app-select` escrever, sem passar por um `<form>` de verdade. */
  protected readonly filtroOpcoes: SelectOption[] = [
    { value: 'todos', label: 'Todos' },
    { value: 'exame', label: 'Exames' },
    { value: 'receita', label: 'Receitas' },
  ];
  protected readonly filtroModelo = signal({ tipo: 'todos' as 'todos' | 'exame' | 'receita' });
  protected readonly filtroForm = form(this.filtroModelo);

  protected readonly historicoRows = computed(() =>
    this.facade
      .historico()
      .filter((item) => this.filtroModelo().tipo === 'todos' || item.tipo === this.filtroModelo().tipo)
      .map((item) => ({
        ...item,
        tipo: item.tipo === 'exame' ? 'Exame' : 'Receita',
        data: this.formatar(item.data),
        atualizadoEmFormatado: item.atualizadoEm
          ? new Date(item.atualizadoEm).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          : '—',
        // Só exame tem anotação — a ação fica escondida na linha de receita.
        _semAcao: item.tipo !== 'exame',
      })),
  );

  protected readonly historicoColumns = HISTORICO_COLUMNS;

  /**
   * Anotação de exame — reaproveita o campo `diagnosis` que já existe na
   * entidade `Exam` mas nunca tinha tela pra preencher. Fica num modal à
   * parte porque a linha da tabela não tem espaço pra um texto livre.
   * Busca o exame por id em vez de reaproveitar `facade.historico()` porque
   * a linha do tempo não carrega `diagnosis` — só o resumo pra exibição.
   */
  private readonly buscarExame = inject(ExamFindById);
  private readonly atualizarExame = inject(ExamUpdate);
  protected readonly anotacaoAberta = signal(false);
  protected readonly anotacaoExameNome = signal('');
  protected readonly anotacaoRascunho = signal('');
  protected readonly salvandoAnotacao = signal(false);
  private anotacaoExame: Exams | null = null;

  protected async abrirAnotacao(exameId: string | number): Promise<void> {
    try {
      const exame = await this.buscarExame.findById({ id: String(exameId) });
      this.anotacaoExame = exame;
      this.anotacaoExameNome.set(exame.name);
      this.anotacaoRascunho.set(exame.diagnosis ?? '');
      this.anotacaoAberta.set(true);
    } catch {
      this.toast.add('Não foi possível abrir o exame', ToastType.ERROR);
    }
  }

  protected fecharAnotacao(): void {
    this.anotacaoAberta.set(false);
  }

  /**
   * Alterna o status de um exame ou receita — `ChangeStatus` no domínio é um
   * alternador entre os dois valores possíveis (Em Andamento/Realizado,
   * Administrando/Suspenso), não uma seleção livre, então clicar no selo
   * basta. `stamped()` já carimba `updatedAt` na escrita, então a coluna
   * "Atualizado em" reflete a troca de status sem nenhum código a mais.
   */
  private readonly alternarStatusExame = inject(ExamChangeStatus);
  private readonly alternarStatusReceita = inject(PrescriptionChangeStatus);

  protected alterarStatus(id: string | number): void {
    const item = this.facade.historico().find((registro) => registro.id === id);
    if (!item) return;

    const tipoNome = item.tipo === 'exame' ? 'Exame' : 'Receita';
    this.popup.show({
      data: {
        title: `Alterar status de ${tipoNome}?`,
        message: 'A coluna "Atualizado em" será atualizada com a data e hora atuais.',
      },
      onConfirm: async () => {
        try {
          if (item.tipo === 'exame') {
            await this.alternarStatusExame.changeStatus({ id: String(id) });
          } else {
            await this.alternarStatusReceita.changeStatus({ id: String(id) });
          }
          this.facade.reloadHistorico();
        } catch {
          this.toast.add('Não foi possível alterar o status', ToastType.ERROR);
        }
      },
    });
  }

  protected async salvarAnotacao(): Promise<void> {
    if (!this.anotacaoExame) return;

    this.salvandoAnotacao.set(true);
    try {
      await this.atualizarExame.update({
        data: { ...this.anotacaoExame, diagnosis: this.anotacaoRascunho().trim() || undefined },
      });
      this.toast.add('Anotação salva', ToastType.SUCESS);
      this.anotacaoAberta.set(false);
      this.facade.reloadHistorico();
    } catch {
      this.toast.add('Não foi possível salvar a anotação', ToastType.ERROR);
    } finally {
      this.salvandoAnotacao.set(false);
    }
  }

  /**
   * Anamnese é preenchida depois que o paciente já existe — não faz parte
   * do assistente de cadastro, é registro clínico de acompanhamento. Fica
   * editável direto no prontuário, com rascunho local até salvar.
   */
  protected readonly anamneseRascunho = signal('');
  protected readonly salvandoAnamnese = signal(false);
  private readonly atualizar = inject(PatientUpdate);

  /** Sub-abas do card "Prontuário" — cada uma ocupa a largura toda do card,
   *  uma por vez, no lugar das telas separadas que existiam antes. */
  protected readonly resumoAba = signal<'pessoais' | 'anamnese' | 'clinicos'>('pessoais');

  protected readonly anamneseAlterada = computed(
    () => this.anamneseRascunho() !== (this.facade.patient()?.anamnese ?? ''),
  );

  protected descartarAnamnese(atual: string): void {
    this.anamneseRascunho.set(atual);
  }

  protected async salvarAnamnese(paciente: Patient): Promise<void> {
    this.salvandoAnamnese.set(true);
    try {
      await this.atualizar.update({
        data: { ...paciente, anamnese: this.anamneseRascunho().trim() },
      });
      this.toast.add('Anamnese salva', ToastType.SUCESS);
      this.facade.reloadPatient();
    } catch {
      this.toast.add('Não foi possível salvar a anamnese', ToastType.ERROR);
    } finally {
      this.salvandoAnamnese.set(false);
    }
  }

  private readonly excluir = inject(PatientDelete);

  protected readonly kebabItems = computed<KebabItem[]>(() => [
    {
      icon: 'TiUserDelete',
      name: 'Excluir Paciente',
      action: () => this.confirmarExclusao(),
    },
  ]);

  private confirmarExclusao(): void {
    const paciente = this.facade.patient();
    if (!paciente) return;
    this.popup.show({
      data: {
        title: 'Excluir Paciente?',
        message: 'Tem certeza de que deseja excluir? Não há como desfazer esta ação!',
      },
      onConfirm: async () => {
        try {
          await this.excluir.delete({ ids: [paciente.id] });
          this.toast.add('Paciente apagado', ToastType.SUCESS);
          this.router.navigate(['/pacientes']);
        } catch {
          this.toast.add('Houve um problema ao apagar o paciente', ToastType.ERROR);
        }
      },
    });
  }

  constructor() {
    effect(() => this.facade.patientId.set(this.id()));
    // Sincroniza o rascunho sempre que o paciente (re)carrega — inclusive
    // depois de salvar, quando `reloadPatient()` traz a versão persistida.
    effect(() => this.anamneseRascunho.set(this.facade.patient()?.anamnese ?? ''));
  }
}
