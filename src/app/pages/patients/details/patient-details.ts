import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Button } from '@app/shared/components/button/button';
import { Icon } from '@app/shared/components/icon/icon';
import { KebabMenu, type KebabItem } from '@app/shared/components/kebab-menu/kebab-menu';
import { PopupService } from '@app/shared/services/popup';
import { ToastService, ToastType } from '@app/shared/services/toast';
import { Table, type DataColumn } from '@app/shared/components/table/table';
import { getAge, formmatDate, getLocalDateInput, getLocalTimeInput } from '@core/utils/date-utils';
import { mascaraPressao } from '@core/utils/masks';
import type { BloodPressureReading, Exams, Patient } from '@domain/entities';
import { ExamFindById, ExamUpdate, PatientDelete, PatientUpdate } from '@domain/tokens';
import { PatientDetailsFacade } from './patient-details-facade';

/**
 * Sem "Profissional" (quem atendeu) de propósito: essa coluna existe no
 * protótipo, mas o domínio não tem entidade de profissional nem vínculo
 * nenhum registro guarda quem atendeu, e os fluxos de criação de exame e
 * receita ainda nem existem no Angular pra alguém preencher isso. Adicionar
 * a coluna preenchida com traço seria pior que não ter a coluna.
 */
const HISTORICO_COLUMNS: DataColumn[] = [
  { name: 'Atendimento', key: 'titulo', type: 'text', width: '35%' },
  { name: 'Tipo', key: 'tipo', type: 'text', width: '15%' },
  { name: 'Data', key: 'data', type: 'text', width: '18%' },
  { name: 'Status', key: 'status', type: 'status', width: '20%' },
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
  imports: [Button, Icon, KebabMenu, RouterLink, Table],
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

  protected readonly formatar = (data: unknown) =>
    data ? formmatDate(data as unknown as Date) : '—';

  protected readonly idade = computed(() => {
    const p = this.facade.patient();
    return p ? getAge(p.birthday) : null;
  });

  protected readonly ultimoAtendimento = computed(() => this.facade.historico()[0] ?? null);

  /** Filtro por tipo de atendimento na aba Histórico. */
  protected readonly historicoFiltro = signal<'todos' | 'exame' | 'receita'>('todos');

  protected readonly historicoRows = computed(() =>
    this.facade
      .historico()
      .filter((item) => this.historicoFiltro() === 'todos' || item.tipo === this.historicoFiltro())
      .map((item) => ({
        ...item,
        tipo: item.tipo === 'exame' ? 'Exame' : 'Receita',
        data: this.formatar(item.data),
        // Só exame tem anotação — a ação fica escondida na linha de receita.
        _semAcao: item.tipo !== 'exame',
      })),
  );

  protected readonly historicoColumns = HISTORICO_COLUMNS;

  /** IMC calculado — peso/altura já existem no cadastro, então não é dado
   *  inventado, só uma conta em cima do que o paciente informou. */
  protected readonly imc = computed(() => {
    const { weight, height } = this.facade.patient()?.health ?? {};
    if (!weight || !height) return null;
    const metros = height / 100;
    return (weight / (metros * metros)).toFixed(1);
  });

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
   * Registro de pressão arterial — o paciente não tinha esse dado antes;
   * agora vira um histórico de verdade, com data e horário de cada aferição,
   * em vez de um valor único e estático.
   */
  protected readonly leituras = computed(() =>
    [...(this.facade.patient()?.health.bloodPressureReadings ?? [])].sort((a, b) =>
      b.measuredAt.localeCompare(a.measuredAt),
    ),
  );

  protected readonly ultimaLeitura = computed(() => this.leituras()[0] ?? null);

  /** `measuredAt` chega como `AAAA-MM-DDTHH:MM`, produzido pelos próprios
   *  inputs de data/hora — só reordena pro formato brasileiro pra exibição. */
  protected formatarDataHora(measuredAt: string): string {
    const [data, hora] = measuredAt.split('T');
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano} ${hora}`;
  }

  // Começa preenchido com a data/hora atuais — a aferição normalmente
  // acontece na hora de registrar, então digitar isso toda vez seria atrito
  // sem propósito; quem estiver registrando algo passado ainda pode editar.
  protected readonly pressaoData = signal(getLocalDateInput());
  protected readonly pressaoHora = signal(getLocalTimeInput());
  protected readonly pressaoValor = signal('');
  protected readonly registrandoPressao = signal(false);

  protected onPressaoInput(evento: Event): void {
    const alvo = evento.target as HTMLInputElement;
    const formatado = mascaraPressao(alvo.value);
    alvo.value = formatado;
    this.pressaoValor.set(formatado);
  }

  protected async registrarPressao(paciente: Patient): Promise<void> {
    const data = this.pressaoData();
    const hora = this.pressaoHora();
    const valor = this.pressaoValor().trim();
    if (!data || !hora || !valor) return;

    this.registrandoPressao.set(true);
    try {
      const leitura: BloodPressureReading = {
        id: crypto.randomUUID(),
        measuredAt: `${data}T${hora}`,
        value: valor,
      };
      await this.atualizar.update({
        data: {
          ...paciente,
          health: {
            ...paciente.health,
            bloodPressureReadings: [...(paciente.health.bloodPressureReadings ?? []), leitura],
          },
        },
      });
      this.pressaoData.set(getLocalDateInput());
      this.pressaoHora.set(getLocalTimeInput());
      this.pressaoValor.set('');
      this.toast.add('Pressão arterial registrada', ToastType.SUCESS);
      this.facade.reloadPatient();
    } catch {
      this.toast.add('Não foi possível registrar a pressão arterial', ToastType.ERROR);
    } finally {
      this.registrandoPressao.set(false);
    }
  }

  protected excluirLeitura(paciente: Patient, leitura: BloodPressureReading): void {
    this.popup.show({
      data: {
        title: 'Excluir leitura?',
        message: `Remover o registro de pressão arterial de ${this.formatarDataHora(
          leitura.measuredAt,
        )}? Não há como desfazer esta ação!`,
      },
      onConfirm: async () => {
        try {
          await this.atualizar.update({
            data: {
              ...paciente,
              health: {
                ...paciente.health,
                bloodPressureReadings: (paciente.health.bloodPressureReadings ?? []).filter(
                  (l) => l.id !== leitura.id,
                ),
              },
            },
          });
          this.toast.add('Leitura removida', ToastType.SUCESS);
          this.facade.reloadPatient();
        } catch {
          this.toast.add('Não foi possível remover a leitura', ToastType.ERROR);
        }
      },
    });
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
