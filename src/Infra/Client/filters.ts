/* eslint-disable no-useless-computed-key */
import { Patient, Prescription } from "../Entities";
import Exam from "../Entities/Exams";

type FilterParams = {
  key: "healthInsurance" | "city" | "patient" | "done" | "administering";
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

const filterExamByStatus = (done: string, exam: Exam) => done === exam.done;

const filterPrescriptionByStatus = (
  administering: string,
  prescription: Prescription
) => administering === prescription.administering;

const filters = {
  ["healthInsurance"]: filterInsurance,
  ["city"]: filterCity,
  ["patient"]: filterPatientName,
  ["patientId"]: filterExamByPatient,
  ["done"]: filterExamByStatus,
  ["administering"]: filterPrescriptionByStatus,
};

const filterBy = (params: FilterParams) =>
  filters[params.key](params.value, params.record);

export { filterBy };
