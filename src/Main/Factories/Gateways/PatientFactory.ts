import {
  LocalAddPatient,
  LocalDeletePatient,
  LocalUpdatePatient,
  LocalFindByIdPatient,
  LocalListCities,
  LocalListInsurance,
  LocalListPaginationPatient,
} from "../../../Data";

import makeClient from "../Client/ClientFactory";

const patientClient = makeClient("patients");
// NEW FACTORIES

function makePatientAdd() {
  return new LocalAddPatient(patientClient);
}

function makePatientUpdate() {
  return new LocalUpdatePatient(patientClient);
}

function makePatientFindById() {
  return new LocalFindByIdPatient(patientClient);
}

function makeListCities() {
  return new LocalListCities(patientClient);
}
function makeListInsurance() {
  return new LocalListInsurance(patientClient);
}

function makePatientDelete() {
  return new LocalDeletePatient(patientClient);
}

function makePatientListPagination() {
  return new LocalListPaginationPatient(patientClient);
}

export {
  // NEW FACTORIES
  makePatientListPagination,
  makePatientDelete,
  makePatientAdd,
  makePatientUpdate,
  makePatientFindById,
  makeListCities,
  makeListInsurance,
};
