import { RegisterProvider } from "../../../Presentation/Hooks/useRegister";
import { Register } from "../../../Presentation/Pages/Pacientes";
import {
  makePatientAdd,
  makePatientFindById,
  makePatientUpdate,
} from "../Gateways/PatientFactory";

export function makeRegisterPatientPage() {
  return (
    <RegisterProvider>
      <Register
        add={makePatientAdd()}
        findById={makePatientFindById()}
        update={makePatientUpdate()}
      />
    </RegisterProvider>
  );
}
