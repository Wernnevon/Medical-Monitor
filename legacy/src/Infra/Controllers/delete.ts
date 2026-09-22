import {
  PatientRepository,
  ExamRepository,
  PrescriptionRepository,
} from "../Repositories/Delete";

export async function deleteStrategies(key: any, data: any) {
  const examDelete = new ExamRepository();
  const patientDelete = new PatientRepository();
  const prescriptionDelete = new PrescriptionRepository();

  const getStrategy: any = {
    "patient/delete": patientDelete.delete,
    "exam/delete": examDelete.delete,
    "prescription/delete": prescriptionDelete.delete,
  };

  return Promise.resolve(getStrategy[key](data));
}
