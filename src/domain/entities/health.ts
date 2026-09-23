export type BloodPressureReading = {
  /** Chave própria pra identificar a leitura na exclusão — duas aferições
   *  no mesmo minuto teriam o mesmo `measuredAt`. */
  id: string;
  /** ISO local — data e hora da aferição, combinadas num campo só. */
  measuredAt: string;
  /** Texto livre no formato "120/80", como o paciente/profissional anota. */
  value: string;
};

export type GlycemiaReading = {
  id: string;
  measuredAt: string;
  /** Valor da glicemia em mg/dL. */
  value: string;
};

export type OxygenSaturationReading = {
  id: string;
  measuredAt: string;
  /** Valor da saturação de oxigênio em %. */
  value: string;
};

export type HeartRateReading = {
  id: string;
  measuredAt: string;
  /** Valor da frequência cardíaca em bpm. */
  value: string;
};

type Health = {
  healthInsurance: string;
  allergy?: string;
  weight?: number;
  height?: number;
  bloodType?: string;
  bloodPressureReadings?: BloodPressureReading[];
  glycemiaReadings?: GlycemiaReading[];
  oxygenSaturationReadings?: OxygenSaturationReading[];
  heartRateReadings?: HeartRateReading[];
};

export default Health;
