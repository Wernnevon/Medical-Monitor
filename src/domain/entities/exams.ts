import type Syncable from './syncable';

export enum ExamStatus {
  DONE = 'Realizado',
  IN_PROGRESS = 'Em Andamento',
}

type Exam = Syncable & {
  patientId: string;
  name: string;
  requisitionDate: Date;
  realizationDate?: Date;
  status: ExamStatus;
  diagnosis?: string;
};

export default Exam;
