import { PrescriptionList } from "../../../Presentation/Pages/Pacientes/Details/PrecriptionList";

import {
  makePrescriptionChangeStatus,
  makePrescriptionsDelete,
  makePrescriptionsListPagination,
} from "../Gateways/PrescriptionFactory";

export function makePrescriptionListPage(id?: string) {
  return (
    <PrescriptionList
      patientId={id}
      list={makePrescriptionsListPagination()}
      remove={makePrescriptionsDelete()}
      status={makePrescriptionChangeStatus()}
    />
  );
}
