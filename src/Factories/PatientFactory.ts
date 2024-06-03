import {
  LocalPatientStore,
  LocalPatientUpdate,
  LocalPatientDelete,
  LocalPatientFind,
  LocalPatientList,
} from "../Data";

import makeClient from "./ClientFactory";

const patientClient = makeClient("patients");

const makeLocalPatientStore = () => new LocalPatientStore(patientClient);

const makeLocalPatientUpdate = () => new LocalPatientUpdate(patientClient);

const makeLocalPatientDelete = () => new LocalPatientDelete(patientClient);

const makeLocalPatientFind = () => new LocalPatientFind(patientClient);

const makeLocalPatientList = () => new LocalPatientList(patientClient);

export {
  makeLocalPatientStore,
  makeLocalPatientUpdate,
  makeLocalPatientDelete,
  makeLocalPatientFind,
  makeLocalPatientList,
};
