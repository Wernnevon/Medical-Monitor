import type { Patient } from '@domain/entities';

type FilterKey = 'healthInsurance' | 'city' | 'text' | 'patientId' | 'status';

type FilterParams = {
  key: FilterKey;
  value: string;
  record: any;
};

const filterCity = (city: string, patient: Patient) =>
  patient.adress.city === city;

const filterInsurance = (healthInsurance: string, patient: Patient) =>
  patient.health.healthInsurance === healthInsurance;

const filterText = (name: string, compareName: string) =>
  compareName.toLocaleLowerCase().includes(name.toLocaleLowerCase());

const filterByPatient = (patientId: string, entity: any) =>
  Number(patientId) === entity.patientId;

const filterByStatus = (done: string, entity: any) => done === entity.status;

const filters: Record<FilterKey, (value: any, record: any) => boolean> = {
  healthInsurance: filterInsurance,
  city: filterCity,
  text: filterText,
  patientId: filterByPatient,
  status: filterByStatus,
};

const filterBy = (params: FilterParams) =>
  filters[params.key](params.value, params.record);

export { filterBy };
export type { FilterKey, FilterParams };
