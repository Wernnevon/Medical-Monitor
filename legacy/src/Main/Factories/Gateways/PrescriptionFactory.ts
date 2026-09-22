import {
  LocalAddPrescriptions,
  LocalDeletePrescriptions,
  LocalUpdatePrescriptions,
  LocalFindByIdPrescriptions,
  LocalListPaginationPrescriptions,
} from "../../../Data";
import { LocalChangeStatus } from "../../../Data/UseCases/Prescriptions/LocalChangeStatus";

import makeClient from "../Client/ClientFactory";

const prescriptionsClient = makeClient("prescriptions");
// NEW FACTORIES

function makePrescriptionsAdd() {
  return new LocalAddPrescriptions(prescriptionsClient);
}

function makePrescriptionsUpdate() {
  return new LocalUpdatePrescriptions(prescriptionsClient);
}

function makePrescriptionsFindById() {
  return new LocalFindByIdPrescriptions(prescriptionsClient);
}

function makePrescriptionsDelete() {
  return new LocalDeletePrescriptions(prescriptionsClient);
}

function makePrescriptionsListPagination() {
  return new LocalListPaginationPrescriptions(prescriptionsClient);
}

function makePrescriptionChangeStatus() {
  return new LocalChangeStatus(prescriptionsClient);
}

export {
  // NEW FACTORIES
  makePrescriptionsListPagination,
  makePrescriptionsDelete,
  makePrescriptionsAdd,
  makePrescriptionsUpdate,
  makePrescriptionsFindById,
  makePrescriptionChangeStatus,
};
