import {
  PatientRepository,
  ExamRepository,
  PrescriptionRepository,
} from "../Repositories/Get";

export async function getStrategies(key: any, data: any) {
  const examGet = new ExamRepository();
  const patientGet = new PatientRepository();
  const prescriptionGet = new PrescriptionRepository();

  const getStrategy: any = {
    "patient/list": patientGet.list,
    "patient/findById": patientGet.findById,
    "patient/listCities": patientGet.listCities,
    "patient/listInsurances": patientGet.listInsurances,
    "exam/list": examGet.list,
    "exam/findById": examGet.findById,
    "precription/list": prescriptionGet.list,
    "precription/findById": prescriptionGet.findById,
  };

  return Promise.resolve(await getStrategy[key](data));
}
