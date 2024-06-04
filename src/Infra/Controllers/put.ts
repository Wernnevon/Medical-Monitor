import { ConnectionType, getConnection } from "../Frameworks/indexedConnection";
import {
  PatientRepository,
  ExamRepository,
  PrescriptionRepository,
} from "../Repositories/Put";

const connection = getConnection("exams", ConnectionType.READONLY);

const putRepositories = {
  exam: new ExamRepository(connection),
  patient: new PatientRepository(connection),
  prescription: new PrescriptionRepository(connection),
};

export const putStrategy = {
  "patient/update": putRepositories.patient.update,
  "exam/update": putRepositories.exam.update,
  "exam/changeStatus": putRepositories.exam.changeStatus,
  "prescription/update": putRepositories.prescription.update,
  "prescription/changeStatus": putRepositories.prescription.changeStatus,
};
