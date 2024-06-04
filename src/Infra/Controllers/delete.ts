import { ConnectionType, getConnection } from "../Frameworks/indexedConnection";
import {
  PatientRepository,
  ExamRepository,
  PrescriptionRepository,
} from "../Repositories/Delete";

const connection = getConnection("exams", ConnectionType.READONLY);

const deleteRepositories = {
  exam: new ExamRepository(connection),
  patient: new PatientRepository(connection),
  prescription: new PrescriptionRepository(connection),
};

export const deleteStrategy = {
  "patient/delete": deleteRepositories.patient.delete,
  "exam/delete": deleteRepositories.exam.delete,
  "prescription/delete": deleteRepositories.prescription.delete,
};
