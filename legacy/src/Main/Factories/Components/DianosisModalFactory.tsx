import { Diagnosis } from "../../../Presentation/Components/Diagnosis";
import { makeExamsFindById, makeExamsUpdate } from "../Gateways/ExameFactory";

type Props = {
  isVisible: boolean;
  diagnosisId: number;
  close(): void;
};
export function makeDiagnosisModalComponent({
  isVisible,
  diagnosisId,
  close,
}: Props) {
  return (
    <Diagnosis
      findExam={makeExamsFindById()}
      updateExam={makeExamsUpdate()}
      isVisible={isVisible}
      diagnosisId={diagnosisId}
      close={close}
    />
  );
}
