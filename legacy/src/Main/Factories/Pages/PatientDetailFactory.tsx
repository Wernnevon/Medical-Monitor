import { Details } from "../../../Presentation/Pages/Pacientes";
import { makePatientFindById } from "../Gateways/PatientFactory";

export function makePatientDetailPage() {
  return <Details findById={makePatientFindById()} />;
}
