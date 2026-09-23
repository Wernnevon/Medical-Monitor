export type BloodPressureReading = {
  /** Chave própria pra identificar a leitura na exclusão — duas aferições
   *  no mesmo minuto teriam o mesmo `measuredAt`. */
  id: string;
  /** ISO local — data e hora da aferição, combinadas num campo só. */
  measuredAt: string;
  /** Texto livre no formato "120/80", como o paciente/profissional anota. */
  value: string;
};

type Health = {
  healthInsurance: string;
  allergy?: string;
  weight?: number;
  height?: number;
  bloodType?: string;
  bloodPressureReadings?: BloodPressureReading[];
};

export default Health;
