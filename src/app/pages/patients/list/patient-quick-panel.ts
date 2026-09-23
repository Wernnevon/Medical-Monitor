import { Component, computed, inject, input, resource } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Icon } from '@app/shared/components/icon/icon';
import type { IconName } from '@app/shared/components/icon/icons';
import { getAge, formmatDate } from '@core/utils/date-utils';
import type { Patient } from '@domain/entities';
import { ExamListPagination } from '@domain/tokens';
import { PrescriptionListPagination } from '@domain/tokens';

type Atendimento = {
  tipo: 'exame' | 'receita';
  icone: IconName;
  titulo: string;
  data: string;
  status: string;
};

/** Recorta as iniciais do nome para o avatar — até duas letras. */
function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return '?';
  return (partes[0][0] + (partes[1]?.[0] ?? '')).toUpperCase();
}

/**
 * Painel de acesso rápido ao lado da lista de pacientes.
 *
 * Mostra o paciente selecionado na tabela sem exigir navegação: dados de
 * contato, convênio e os atendimentos mais recentes, todos lidos pelos
 * mesmos tokens de domínio que a página de detalhes usa — nada aqui é dado
 * simulado.
 *
 * `busca por patientId` reaproveita o filtro genérico que `paginateStore`
 * já suporta (`filters: [{ key: 'patientId', value }]`), o mesmo caminho
 * usado internamente pela busca por cidade/convênio na lista de pacientes.
 * Não foi preciso criar nenhum contrato novo no domínio.
 */
@Component({
  selector: 'app-patient-quick-panel',
  imports: [Icon, RouterLink],
  templateUrl: './patient-quick-panel.html',
  styleUrl: './patient-quick-panel.scss',
})
export class PatientQuickPanel {
  readonly patient = input<Patient | null>(null);

  private readonly router = inject(Router);
  private readonly examUseCase = inject(ExamListPagination);
  private readonly prescriptionUseCase = inject(PrescriptionListPagination);

  protected readonly iniciais = computed(() =>
    this.patient() ? iniciais(this.patient()!.name) : '',
  );

  protected readonly idade = computed(() => {
    const p = this.patient();
    return p ? getAge(p.birthday) : null;
  });

  protected readonly enderecoResumo = computed(() => {
    const a = this.patient()?.adress;
    if (!a) return '';
    return [a.city, a.neighborhood].filter(Boolean).join(' — ');
  });

  private readonly registros = resource({
    params: () => ({ id: this.patient()?.id }),
    loader: async ({ params }) => {
      if (!params.id) return { exames: [] as any[], receitas: [] as any[] };
      const filtro = [{ key: 'patientId', value: params.id }];
      const [exames, receitas] = await Promise.all([
        this.examUseCase.listPagination({ page: 1, pageSize: 200, filters: filtro }),
        this.prescriptionUseCase.listPagination({ page: 1, pageSize: 200, filters: filtro }),
      ]);
      return { exames: exames.entries, receitas: receitas.entries };
    },
    defaultValue: { exames: [], receitas: [] },
  });

  protected readonly totalExames = computed(() => this.registros.value().exames.length);
  protected readonly totalReceitas = computed(() => this.registros.value().receitas.length);

  protected readonly atendimentosRecentes = computed<Atendimento[]>(() => {
    const { exames, receitas } = this.registros.value();
    const lista: Atendimento[] = [
      ...exames.map((e: any) => ({
        tipo: 'exame' as const,
        icone: 'BiTestTube' as IconName,
        titulo: e.name,
        data: e.requisitionDate,
        status: e.status,
      })),
      ...receitas.map((r: any) => ({
        tipo: 'receita' as const,
        icone: 'LuClipboardEdit' as IconName,
        titulo: r.medicament,
        data: r.date,
        status: r.status,
      })),
    ];
    return lista
      .sort((a, b) => String(b.data).localeCompare(String(a.data)))
      .slice(0, 3);
  });

  protected formatar(data: string | Date): string {
    return formmatDate(data as unknown as Date);
  }

  /**
   * `exames`/`receitas` são rotas gerais, não filhas de `detalhes/:id` — ver
   * `app.routes.ts`. `historico` não é uma rota própria: os últimos
   * atendimentos vivem direto na página de detalhes, então cai no mesmo
   * destino do "Ver Detalhes".
   */
  protected irPara(destino: '' | 'exames' | 'receitas' | 'historico'): void {
    const id = this.patient()?.id;
    if (!id) return;

    if (destino === 'exames' || destino === 'receitas') {
      this.router.navigate([`/${destino}`], { queryParams: { patientId: id } });
      return;
    }
    this.router.navigate(['/pacientes/detalhes', id]);
  }
}
