/* eslint-disable no-useless-computed-key */
import { Patient } from "../Entities";

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

const filters = {
  ["healthInsurance"]: filterInsurance,
  ["city"]: filterCity,
  ["patient"]: filterPatientName,
};

const filterBy = (params: FilterParams) =>
  filters[params.key](params.value, params.record);

export { filterBy };
