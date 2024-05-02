import {
  LocalPatientStore,
  LocalPatientUpdate,
  LocalPatientDelete,
  LocalPatientFind,
  LocalPatientList,
} from "../Infra/Data";

import makeClient from "./ClientFactory";

const examClient = makeClient("patient");

const makeLocalPatientStore = () => new LocalPatientStore(examClient);

const makeLocalPatientUpdate = () => new LocalPatientUpdate(examClient);

const makeLocalPatientDelete = () => new LocalPatientDelete(examClient);

const makeLocalPatientFind = () => new LocalPatientFind(examClient);

const makeLocalPatientList = () => new LocalPatientList(examClient);

export {
  makeLocalPatientStore,
  makeLocalPatientUpdate,
  makeLocalPatientDelete,
  makeLocalPatientFind,
  makeLocalPatientList,
};
