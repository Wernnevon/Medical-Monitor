import {
  PatientRepository,
  ExamRepository,
  PrescriptionRepository,
} from "../Repositories/Post";

export async function postStrategies(key: any, data: any) {
  const examPost = new ExamRepository();
  const patientPost = new PatientRepository();
  const prescriptionPost = new PrescriptionRepository();

  const getStrategy: any = {
    "patient/list": patientPost.listPagination,
    "patient/save": patientPost.save,
    "exam/list": examPost.listPagination,
    "exam/save": examPost.save,
    "prescription/list": prescriptionPost.listPagination,
    "prescription/save": prescriptionPost.save,
  };

  return Promise.resolve(getStrategy[key](data));
}
