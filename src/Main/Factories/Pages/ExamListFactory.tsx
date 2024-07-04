import { ModalDiagnosisProvider } from "../../../Presentation/Hooks/useDiagnosis";
import { ExamList } from "../../../Presentation/Pages/Pacientes/Details/ExamList";
import {
  makeExamsChangeStatus,
  makeExamsDelete,
  makeExamsListPagination,
} from "../Gateways/ExameFactory";

export function makeExamListPage(id?: string) {
  return (
    <ModalDiagnosisProvider>
      <ExamList
        patientId={id}
        list={makeExamsListPagination()}
        remove={makeExamsDelete()}
        status={makeExamsChangeStatus()}
      />
    </ModalDiagnosisProvider>
  );
}
