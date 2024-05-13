export enum ExamStatus {
  DONE = "Realizado",
  IN_PROGRESS = "Em Andamento",
}

type Exam = {
  patientId: number;
  name: string;
  requisitionDate: Date;
  realizationDate?: Date;
  done: ExamStatus;
  diagnosis?: string;
  id: string;
};

export default Exam;
