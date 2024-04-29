export enum ExamStatus {
  DONE = "Realizado",
  IN_PROGRESS = "Em Andamento",
}

type Exam = {
  patientId: string;
  name: string;
  requisitionDate: Date;
  realizationDate?: Date;
  done: ExamStatus;
  diagnosis?: string;
  anamnese: string;
};

export default Exam;
