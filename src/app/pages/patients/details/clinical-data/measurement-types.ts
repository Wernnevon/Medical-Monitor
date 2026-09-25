import type { Patient } from '@domain/entities';
import type { AnyReading, ReadingKind } from '@domain/use-cases';
import {
  mascaraFrequenciaCardiaca,
  mascaraGlicemia,
  mascaraPressao,
  mascaraSaturacao,
} from '@core/utils/masks';

/**
 * Catálogo das medidas que o prontuário sabe registrar. Indicadores,
 * formulário e histórico leem tudo daqui — rótulo, unidade, máscara e
 * validação —, então uma medida nova (temperatura, frequência respiratória,
 * escala de dor…) entra com uma entrada nesta lista e o campo
 * correspondente em `Health`, sem mexer nos templates.
 */
export type MeasurementType = {
  kind: ReadingKind;
  /** Nome completo, usado no histórico, nos indicadores e nas mensagens. */
  label: string;
  /** Rótulo curto do seletor de tipo, onde o espaço é apertado. */
  shortLabel: string;
  unit: string;
  placeholder: string;
  mask: (valor: string) => string;
  /** Mensagem de erro, ou `null` quando o valor é aceitável. */
  validate: (valor: string) => string | null;
};

const numeroPositivo = (valor: string) =>
  Number(valor) > 0 ? null : 'Informe um valor maior que zero';

export const MEASUREMENT_TYPES: readonly MeasurementType[] = [
  {
    kind: 'bloodPressureReadings',
    label: 'Pressão arterial',
    shortLabel: 'Pressão arterial',
    unit: 'mmHg',
    placeholder: '120/80',
    mask: mascaraPressao,
    validate: (valor) =>
      /^\d{2,3}\/\d{2,3}$/.test(valor)
        ? null
        : 'Informe no formato sistólica/diastólica, ex.: 120/80',
  },
  {
    kind: 'glycemiaReadings',
    label: 'Glicemia',
    shortLabel: 'Glicemia',
    unit: 'mg/dL',
    placeholder: '120',
    mask: mascaraGlicemia,
    validate: numeroPositivo,
  },
  {
    kind: 'oxygenSaturationReadings',
    label: 'Saturação de O₂',
    shortLabel: 'Saturação',
    unit: '%',
    placeholder: '98',
    mask: mascaraSaturacao,
    validate: numeroPositivo,
  },
  {
    kind: 'heartRateReadings',
    label: 'Frequência cardíaca',
    shortLabel: 'Frequência cardíaca',
    unit: 'bpm',
    placeholder: '72',
    mask: mascaraFrequenciaCardiaca,
    validate: numeroPositivo,
  },
];

export function measurementType(kind: ReadingKind): MeasurementType {
  return MEASUREMENT_TYPES.find((tipo) => tipo.kind === kind)!;
}

/** "98%" colado, o resto com espaço — "120/80 mmHg", "72 bpm". */
export function formatMeasurementValue(tipo: MeasurementType, valor: string): string {
  return tipo.unit === '%' ? `${valor}%` : `${valor} ${tipo.unit}`;
}

/** Leitura acompanhada do seu tipo — o histórico mistura todas as medidas.
 *  O objeto original fica intacto em `reading` porque a exclusão compara o
 *  registro salvo campo a campo. */
export type PatientReading = { reading: AnyReading; type: MeasurementType };

/** Todas as leituras do paciente, da mais recente para a mais antiga. */
export function patientReadings(paciente: Patient): PatientReading[] {
  return MEASUREMENT_TYPES.flatMap((type) =>
    (paciente.health[type.kind] ?? []).map((reading) => ({ reading, type })),
  ).sort((a, b) => b.reading.measuredAt.localeCompare(a.reading.measuredAt));
}

/** `measuredAt` chega como `AAAA-MM-DDTHH:MM`, produzido pelos próprios
 *  inputs de data/hora — só reordena pro formato brasileiro pra exibição. */
export function splitMeasuredAt(measuredAt: string): { data: string; hora: string } {
  const [data, hora] = measuredAt.split('T');
  const [ano, mes, dia] = data.split('-');
  return { data: `${dia}/${mes}/${ano}`, hora };
}
