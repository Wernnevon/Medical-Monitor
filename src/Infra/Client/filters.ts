/* eslint-disable no-useless-computed-key */
import { Patient } from "../../Domain/Entities";

type FilterParams = {
  key: "healthInsurance" | "city" | "text" | "status";
  value: string;
  record: any;
};

const filterCity = (city: string, patient: Patient) =>
  patient.adress.city === city;

const filterInsurance = (healthInsurance: string, patient: Patient) =>
  patient.health.healthInsurance === healthInsurance;

// precisa ser refatorado para funcionar para medicamentos
const filterText = (name: string, patient: Patient) =>
  patient.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());

const filterByPatient = (patientId: string, entity: any) =>
  Number(patientId) === entity.patientId;

const filterByStatus = (done: string, entity: any) => done === entity.status;

const filters = {
  ["healthInsurance"]: filterInsurance,
  ["city"]: filterCity,
  ["text"]: filterText,
  ["patientId"]: filterByPatient,
  ["status"]: filterByStatus,
};

const filterBy = (params: FilterParams) =>
  filters[params.key](params.value, params.record);

export { filterBy };
