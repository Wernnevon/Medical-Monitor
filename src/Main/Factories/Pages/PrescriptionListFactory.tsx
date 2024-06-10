import { PrescriptionList } from "../../../Presentation/Pages/Pacientes/Details/PrecriptionList";

import {
  makePrescriptionsDelete,
  makePrescriptionsListPagination,
} from "../Gateways/PrescriptionFactory";

export function makePrescriptionListPage(id?: string) {
  return (
    <PrescriptionList
      patientId={id}
      list={makePrescriptionsListPagination()}
      remove={makePrescriptionsDelete()}
    />
  );
}
