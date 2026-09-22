import { List } from "../../../Presentation/Pages/Pacientes";
import {
  makeListCities,
  makeListInsurance,
  makePatientDelete,
  makePatientListPagination,
} from "../Gateways/PatientFactory";

export const makePatientListPage = () => (
  <List
    list={makePatientListPagination()}
    remove={makePatientDelete()}
    listCities={makeListCities()}
    listInsurances={makeListInsurance()}
  />
);
