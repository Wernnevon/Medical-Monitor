import type Syncable from './syncable';

export enum PrescriptionStatus {
  SUSPENDED = 'Suspenso',
  ADMINISTERING = 'Administrando',
}

type Prescription = Syncable & {
  patientId: string;
  medicament: string;
  date: Date;
  status: PrescriptionStatus;
};

export default Prescription;
