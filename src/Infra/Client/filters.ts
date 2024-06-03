/* eslint-disable no-useless-computed-key */
import { Patient } from "../../Domain/Entities";

type FilterParams = {
  key: "healthInsurance" | "city" | "patient" | "status";
  value: string;
  record: any;
};

const filterCity = (city: string, patient: Patient) =>
  patient.adress.city === city;

const filterInsurance = (healthInsurance: string, patient: Patient) =>
  patient.health.healthInsurance === healthInsurance;

const filterPatientName = (name: string, patient: Patient) =>
  patient.name.includes(name);

const filterByPatient = (patientId: string, entity: any) =>
  Number(patientId) === entity.patientId;

const filterByStatus = (done: string, entity: any) => done === entity.status;

const filters = {
  ["healthInsurance"]: filterInsurance,
  ["city"]: filterCity,
  ["patient"]: filterPatientName,
  ["patientId"]: filterByPatient,
  ["status"]: filterByStatus,
};

const filterBy = (params: FilterParams) =>
  filters[params.key](params.value, params.record);

export { filterBy };
