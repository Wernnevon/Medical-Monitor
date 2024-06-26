import Prescription from "../../../Presentation/Pages/Prescription";
import { makePatientFindById } from "../Gateways/PatientFactory";
import { makePrescriptionsAdd } from "../Gateways/PrescriptionFactory";

export function makePrescriptionPage() {
  return (
    <Prescription
      findById={makePatientFindById()}
      add={makePrescriptionsAdd()}
    />
  );
}
