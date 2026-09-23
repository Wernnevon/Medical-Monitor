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
import { getAge, formmatDate, getLocalDateInput, getLocalTimeInput } from '@core/utils/date-utils';
import { mascaraPressao, mascaraGlicemia, mascaraSaturacao, mascaraFrequenciaCardiaca } from '@core/utils/masks';
import type { BloodPressureReading, GlycemiaReading, OxygenSaturationReading, HeartRateReading, Exams, Patient } from '@domain/entities';
import { ProfessionalRole } from '@domain/entities';
import {
  ExamChangeStatus,
  ExamFindById,
  ExamUpdate,
  PatientDelete,
  PatientUpdate,
  PrescriptionChangeStatus,
} from '@domain/tokens';
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
  imports: [Button, Icon, KebabMenu, RouterLink, Select, Table],
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

  protected onGlicemiaInput(evento: Event): void {
    const alvo = evento.target as HTMLInputElement;
    const formatado = mascaraGlicemia(alvo.value);
    alvo.value = formatado;
    this.glicemiaValor.set(formatado);
  }

  protected onSaturacaoInput(evento: Event): void {
    const alvo = evento.target as HTMLInputElement;
    const formatado = mascaraSaturacao(alvo.value);
    alvo.value = formatado;
    this.saturacaoValor.set(formatado);
  }

  protected onFrequenciaInput(evento: Event): void {
    const alvo = evento.target as HTMLInputElement;
    const formatado = mascaraFrequenciaCardiaca(alvo.value);
    alvo.value = formatado;
    this.frequenciaValor.set(formatado);
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
   * Glicemia — histórico de medições de glicose no sangue.
   */
  protected readonly glycemiaReadings = computed(() =>
    [...(this.facade.patient()?.health.glycemiaReadings ?? [])].sort((a, b) =>
      b.measuredAt.localeCompare(a.measuredAt),
    ),
  );

  protected readonly ultimaGlicemia = computed(() => this.glycemiaReadings()[0] ?? null);

  protected readonly glicemiaData = signal(getLocalDateInput());
  protected readonly glicemiaHora = signal(getLocalTimeInput());
  protected readonly glicemiaValor = signal('');
  protected readonly registrandoGlicemia = signal(false);

  protected async registrarGlicemia(paciente: Patient): Promise<void> {
    const data = this.glicemiaData();
    const hora = this.glicemiaHora();
    const valor = this.glicemiaValor().trim();
    if (!data || !hora || !valor) return;

    this.registrandoGlicemia.set(true);
    try {
      const leitura: GlycemiaReading = {
        id: crypto.randomUUID(),
        measuredAt: `${data}T${hora}`,
        value: valor,
      };
      await this.atualizar.update({
        data: {
          ...paciente,
          health: {
            ...paciente.health,
            glycemiaReadings: [...(paciente.health.glycemiaReadings ?? []), leitura],
          },
        },
      });
      this.glicemiaData.set(getLocalDateInput());
      this.glicemiaHora.set(getLocalTimeInput());
      this.glicemiaValor.set('');
      this.toast.add('Glicemia registrada', ToastType.SUCESS);
      this.facade.reloadPatient();
    } catch {
      this.toast.add('Não foi possível registrar a glicemia', ToastType.ERROR);
    } finally {
      this.registrandoGlicemia.set(false);
    }
  }

  protected excluirGlicemia(paciente: Patient, leitura: GlycemiaReading): void {
    this.popup.show({
      data: {
        title: 'Excluir leitura?',
        message: `Remover o registro de glicemia de ${this.formatarDataHora(
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
                glycemiaReadings: (paciente.health.glycemiaReadings ?? []).filter(
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
   * Saturação de oxigênio — histórico de medições de O2.
   */
  protected readonly oxygenReadings = computed(() =>
    [...(this.facade.patient()?.health.oxygenSaturationReadings ?? [])].sort((a, b) =>
      b.measuredAt.localeCompare(a.measuredAt),
    ),
  );

  protected readonly ultimaSaturacao = computed(() => this.oxygenReadings()[0] ?? null);

  protected readonly saturacaoData = signal(getLocalDateInput());
  protected readonly saturacaoHora = signal(getLocalTimeInput());
  protected readonly saturacaoValor = signal('');
  protected readonly registrandoSaturacao = signal(false);

  protected async registrarSaturacao(paciente: Patient): Promise<void> {
    const data = this.saturacaoData();
    const hora = this.saturacaoHora();
    const valor = this.saturacaoValor().trim();
    if (!data || !hora || !valor) return;

    this.registrandoSaturacao.set(true);
    try {
      const leitura: OxygenSaturationReading = {
        id: crypto.randomUUID(),
        measuredAt: `${data}T${hora}`,
        value: valor,
      };
      await this.atualizar.update({
        data: {
          ...paciente,
          health: {
            ...paciente.health,
            oxygenSaturationReadings: [...(paciente.health.oxygenSaturationReadings ?? []), leitura],
          },
        },
      });
      this.saturacaoData.set(getLocalDateInput());
      this.saturacaoHora.set(getLocalTimeInput());
      this.saturacaoValor.set('');
      this.toast.add('Saturação de oxigênio registrada', ToastType.SUCESS);
      this.facade.reloadPatient();
    } catch {
      this.toast.add('Não foi possível registrar a saturação de oxigênio', ToastType.ERROR);
    } finally {
      this.registrandoSaturacao.set(false);
    }
  }

  protected excluirSaturacao(paciente: Patient, leitura: OxygenSaturationReading): void {
    this.popup.show({
      data: {
        title: 'Excluir leitura?',
        message: `Remover o registro de saturação de oxigênio de ${this.formatarDataHora(
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
                oxygenSaturationReadings: (paciente.health.oxygenSaturationReadings ?? []).filter(
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
   * Frequência cardíaca — histórico de medições de batimentos cardíacos.
   */
  protected readonly heartRateReadings = computed(() =>
    [...(this.facade.patient()?.health.heartRateReadings ?? [])].sort((a, b) =>
      b.measuredAt.localeCompare(a.measuredAt),
    ),
  );

  protected readonly ultimaFrequenciaCardiaca = computed(() => this.heartRateReadings()[0] ?? null);

  protected readonly frequenciaData = signal(getLocalDateInput());
  protected readonly frequenciaHora = signal(getLocalTimeInput());
  protected readonly frequenciaValor = signal('');
  protected readonly registrandoFrequencia = signal(false);

  protected async registrarFrequencia(paciente: Patient): Promise<void> {
    const data = this.frequenciaData();
    const hora = this.frequenciaHora();
    const valor = this.frequenciaValor().trim();
    if (!data || !hora || !valor) return;

    this.registrandoFrequencia.set(true);
    try {
      const leitura: HeartRateReading = {
        id: crypto.randomUUID(),
        measuredAt: `${data}T${hora}`,
        value: valor,
      };
      await this.atualizar.update({
        data: {
          ...paciente,
          health: {
            ...paciente.health,
            heartRateReadings: [...(paciente.health.heartRateReadings ?? []), leitura],
          },
        },
      });
      this.frequenciaData.set(getLocalDateInput());
      this.frequenciaHora.set(getLocalTimeInput());
      this.frequenciaValor.set('');
      this.toast.add('Frequência cardíaca registrada', ToastType.SUCESS);
      this.facade.reloadPatient();
    } catch {
      this.toast.add('Não foi possível registrar a frequência cardíaca', ToastType.ERROR);
    } finally {
      this.registrandoFrequencia.set(false);
    }
  }

  protected excluirFrequencia(paciente: Patient, leitura: HeartRateReading): void {
    this.popup.show({
      data: {
        title: 'Excluir leitura?',
        message: `Remover o registro de frequência cardíaca de ${this.formatarDataHora(
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
                heartRateReadings: (paciente.health.heartRateReadings ?? []).filter(
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
