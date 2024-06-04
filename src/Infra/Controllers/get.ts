import { ConnectionType, getConnection } from "../Frameworks/indexedConnection";
import {
  PatientRepository,
  ExamRepository,
  PrescriptionRepository,
} from "../Repositories/Get";

const connection = getConnection("exams", ConnectionType.READONLY);

const getRepositories = {
  exam: new ExamRepository(connection),
  patient: new PatientRepository(connection),
  prescription: new PrescriptionRepository(connection),
};

export const getStrategy = {
  "patient/list": getRepositories.patient.list,
  "patient/findById": getRepositories.patient.findById,
  "patient/listCities": getRepositories.patient.listCities,
  "patient/listInsurances": getRepositories.patient.listInsurances,
  "exam/list": getRepositories.exam.list,
  "exam/findById": getRepositories.exam.findById,
  "precription/list": getRepositories.prescription.list,
  "precription/findById": getRepositories.prescription.findById,
};
