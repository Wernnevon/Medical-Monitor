import {
  BloodPressureReading,
  GlycemiaReading,
  HeartRateReading,
  OxygenSaturationReading,
} from '../entities/health';

export type ReadingKind =
  | 'bloodPressureReadings'
  | 'glycemiaReadings'
  | 'oxygenSaturationReadings'
  | 'heartRateReadings';

export type AnyReading =
  | BloodPressureReading
  | GlycemiaReading
  | OxygenSaturationReading
  | HeartRateReading;

export interface PatientAddReading {
  add(params: PatientAddReading.Params): Promise<void>;
}

export namespace PatientAddReading {
  export type Params = {
    patientId: string;
    kind: ReadingKind;
    reading: AnyReading;
  };
}
