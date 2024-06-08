import {
  LocalPrescriptionStore,
  LocalPrescriptionUpdate,
  LocalPrescriptionDelete,
  LocalPrescriptionFind,
  LocalPrescriptionList,
} from "../../Data";

import makeClient from "./ClientFactory";

const prescriptionClient = makeClient("prescriptions");

const makeLocalPrescriptionStore = () =>
  new LocalPrescriptionStore(prescriptionClient);

const makeLocalPrescriptionUpdate = () =>
  new LocalPrescriptionUpdate(prescriptionClient);

const makeLocalPrescriptionDelete = () =>
  new LocalPrescriptionDelete(prescriptionClient);

const makeLocalPrescriptionFind = () =>
  new LocalPrescriptionFind(prescriptionClient);

const makeLocalPrescriptionList = () =>
  new LocalPrescriptionList(prescriptionClient);

export {
  makeLocalPrescriptionStore,
  makeLocalPrescriptionUpdate,
  makeLocalPrescriptionDelete,
  makeLocalPrescriptionFind,
  makeLocalPrescriptionList,
};
