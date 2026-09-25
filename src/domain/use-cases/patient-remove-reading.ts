import { AnyReading, ReadingKind } from './patient-add-reading';

export interface PatientRemoveReading {
  remove(params: PatientRemoveReading.Params): Promise<void>;
}

export namespace PatientRemoveReading {
  export type Params = {
    patientId: string;
    kind: ReadingKind;
    reading: AnyReading;
  };
}
