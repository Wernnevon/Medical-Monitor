/* eslint-disable no-useless-computed-key */
import { Patient } from "../Entities";
import Exam from "../Entities/Exams";

type FilterParams = {
  key: "healthInsurance" | "city" | "patient";
  value: string;
  record: any;
};

const filterCity = (city: string, patient: Patient) =>
  patient.adress.city === city;

const filterInsurance = (healthInsurance: string, patient: Patient) =>
  patient.health.healthInsurance === healthInsurance;

const filterPatientName = (name: string, patient: Patient) =>
  patient.name.includes(name);

const filterExamByPatient = (patientId: string, exam: Exam) =>
  Number(patientId) === exam.patientId;

const filters = {
  ["healthInsurance"]: filterInsurance,
  ["city"]: filterCity,
  ["patient"]: filterPatientName,
  ["patientId"]: filterExamByPatient,
};

const filterBy = (params: FilterParams) =>
  filters[params.key](params.value, params.record);

export { filterBy };
