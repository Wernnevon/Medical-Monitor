import type Syncable from './syncable';

export enum PrescriptionStatus {
  SUSPENDED = 'Suspenso',
  ADMINISTERING = 'Administrando',
}

type Prescription = Syncable & {
  patientId: number;
  medicament: string;
  date: Date;
  status: PrescriptionStatus;
  id: number;
};

export default Prescription;
