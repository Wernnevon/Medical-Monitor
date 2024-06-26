import { ExameProvider } from "../../../Presentation/Hooks/useExam";
import Exam from "../../../Presentation/Pages/Exame";
import { makeExamsAdd } from "../Gateways/ExameFactory";
import { makePatientFindById } from "../Gateways/PatientFactory";

export function makeExamPage() {
  return (
    <ExameProvider>
      <Exam add={makeExamsAdd()} findById={makePatientFindById()} />
    </ExameProvider>
  );
}
