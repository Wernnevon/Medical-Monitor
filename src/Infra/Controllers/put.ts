import {
  PatientRepository,
  ExamRepository,
  PrescriptionRepository,
} from "../Repositories/Put";

export async function putStrategies(key: any, data: any) {
  const examPut = new ExamRepository();
  const patientPut = new PatientRepository();
  const prescriptionPut = new PrescriptionRepository();

  const getStrategy: any = {
    "patient/update": patientPut.update,
    "exam/update": examPut.update,
    "exam/changeStatus": examPut.changeStatus,
    "prescription/update": prescriptionPut.update,
    "prescription/changeStatus": prescriptionPut.changeStatus,
  };

  return Promise.resolve(getStrategy[key](data));
}
