import { ExamList } from "../../../Presentation/Pages/Pacientes/Details/ExamList";
import {
  makeExamsDelete,
  makeExamsListPagination,
} from "../Gateways/ExameFactory";

export function makeExamListPage(id?: string) {
  return (
    <ExamList
      patientId={id}
      list={makeExamsListPagination()}
      remove={makeExamsDelete()}
    />
  );
}
