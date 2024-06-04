import { ConnectionType, getConnection } from "../Frameworks/indexedConnection";
import {
  PatientRepository,
  ExamRepository,
  PrescriptionRepository,
} from "../Repositories/Post";

const connection = getConnection("exams", ConnectionType.READONLY);

const postRepositories = {
  exam: new ExamRepository(connection),
  patient: new PatientRepository(connection),
  prescription: new PrescriptionRepository(connection),
};

export const postStrategy = {
  "patient/list": postRepositories.patient.listPagination,
  "patient/save": postRepositories.patient.save,
  "exam/list": postRepositories.exam.listPagination,
  "exam/save": postRepositories.exam.save,
  "prescription/list": postRepositories.prescription.listPagination,
  "prescription/save": postRepositories.prescription.save,
};
