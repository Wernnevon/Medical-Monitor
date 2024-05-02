import { useEffect, useState } from "react";
import { useToastContext } from "../../../../Components/Context/Toast";
import { isNullOrEmptyObject } from "../../../../Components/Utils/isNullOrEmpty";
import {
  Container,
  Card,
  Title,
  ExamContent,
  PrescriptionContent,
  DateLine,
  SatusLine,
  DiagnosisLine,
  Edit,
  Actions,
  Save,
  Text,
  TextArea,
  TitleExam,
} from "./styles";
import Exam, { ExamStatus } from "../../../../Infra/Entities/Exams";
import { Patient, Prescription } from "../../../../Infra/Entities";

interface Props {
  exam?: Exam;
  prescription?: Prescription;
  patient: Patient;
  closeModal: Function;
}

const ExamDetails: React.FC<Props> = ({
  exam,
  prescription,
  patient,
  closeModal,
}: Props) => {
  const [medicamentStatus, setMedicamentStatus] = useState();
  const [examStatus, setExamStatus] = useState(ExamStatus.IN_PROGRESS);
  const [realizationExamData, setRealizationExamData] = useState(new Date());
  const [examDiag, setExamDiag] = useState("");
  const [edit, setEdit] = useState(false);

  const addToast = useToastContext();

  useEffect(() => {
    if (!isNullOrEmptyObject(exam)) {
      setRealizationExamData(exam!.realizationDate || new Date());
      setExamDiag(exam!.diagnosis || "");
      setExamStatus(exam!.done);
    }
  }, [exam]);

  function renderExamsEdit() {
    if (exam?.name) {
      return (
        <ExamContent>
          <Title>{exam.name}</Title>
          <Card>
            <DateLine>
              <div>
                <label>Data de requisição:</label>
                <span>
                  {new Date(exam.requisitionDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <label>Data de realização:</label>
                {examStatus === ExamStatus.DONE ? (
                  <span>
                    {new Date(realizationExamData).toLocaleDateString()}
                  </span>
                ) : (
                  <span>dd/mm/aaaa</span>
                )}
              </div>
            </DateLine>
            <SatusLine>
              <label>Status:</label>
              <span>{examStatus}</span>
            </SatusLine>
            <DiagnosisLine>
              <TitleExam>Conclusão</TitleExam>
              {!edit && <Text>{examDiag || "<Vazio>"}</Text>}
              {edit && (
                <TextArea
                  onChange={({ target }) => setExamDiag(target.value)}
                  value={examDiag}
                />
              )}
              <Actions>
                <Edit onClick={() => setEdit(!edit)}>
                  {edit ? "Concluir" : "Editar"}
                </Edit>
                {!edit && <Save>Salvar</Save>}
              </Actions>
            </DiagnosisLine>
          </Card>
        </ExamContent>
      );
    }
  }

  function renderPrescriptionEdit() {
    if (prescription?.medicament) {
      return (
        <PrescriptionContent>
          <Title>{prescription.medicament}</Title>
          <Card>
            <DateLine>
              <div>
                <label>Data de prescrição:</label>
                <span>{new Date(prescription.date).toLocaleDateString()}</span>
              </div>
            </DateLine>
            <SatusLine>
              <label>Status:</label>
              <span>{medicamentStatus}</span>
            </SatusLine>
            <Save>Salvar</Save>
          </Card>
        </PrescriptionContent>
      );
    }
  }

  return (
    <Container>
      {renderExamsEdit()}
      {renderPrescriptionEdit()}
    </Container>
  );
};
export default ExamDetails;
