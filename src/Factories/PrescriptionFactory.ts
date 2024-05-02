import {
  LocalPrescriptionStore,
  LocalPrescriptionUpdate,
  LocalPrescriptionDelete,
  LocalPrescriptionFind,
  LocalPrescriptionList,
} from "../Infra/Data";

import makeClient from "./ClientFactory";

const examClient = makeClient("prescription");

const makeLocalPrescriptionStore = () => new LocalPrescriptionStore(examClient);

const makeLocalPrescriptionUpdate = () =>
  new LocalPrescriptionUpdate(examClient);

const makeLocalPrescriptionDelete = () =>
  new LocalPrescriptionDelete(examClient);

const makeLocalPrescriptionFind = () => new LocalPrescriptionFind(examClient);

const makeLocalPrescriptionList = () => new LocalPrescriptionList(examClient);

export {
  makeLocalPrescriptionStore,
  makeLocalPrescriptionUpdate,
  makeLocalPrescriptionDelete,
  makeLocalPrescriptionFind,
  makeLocalPrescriptionList,
};
