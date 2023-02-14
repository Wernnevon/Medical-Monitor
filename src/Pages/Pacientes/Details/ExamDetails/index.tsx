import React, { useEffect, useState } from "react";
import {
  ExamStatus,
  PrescriptionSatus,
} from "../../../../Infra/DAOarchive/enumModel";
import Patient, {
  Exam,
  Prescription,
} from "../../../../Infra/DAOarchive/model";
import { update } from "../../../../Infra/DAOarchive/patientDAO";
import { useToastContext } from "../../../../Components/Context/Toast";
import { isNullOrEmptyObject } from "../../../../Components/Utils/isNullOrEmpty";
import { patientExist } from "../../../../Components/Utils/midlleware";
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
  const [medicamentStatus, setMedicamentStatus] = useState(
    PrescriptionSatus.ADMINISTERING
  );
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

  useEffect(() => {
    if (!isNullOrEmptyObject(prescription)) {
      setMedicamentStatus(prescription!.administering);
    }
  }, [prescription]);

  function updatePrescriptios() {
    let { medicament: prescriptions } = patient;
    const prescriptionUpdateIndex = prescriptions.findIndex(
      (receita: Prescription) => receita.medicament === prescription?.medicament
    );
    prescriptions[prescriptionUpdateIndex].administering = medicamentStatus;

    return [...prescriptions];
  }

  function updateExamp() {
    let { exams } = patient;
    const examUpdateIndex = exams.findIndex(
      (exame: Exam) => exame.name === exam?.name
    );
    exams[examUpdateIndex].done = examStatus;
    exams[examUpdateIndex].realizationDate = realizationExamData;
    exams[examUpdateIndex].diagnosis = examDiag;

    return [...exams];
  }

  function handleUpdatePrescriptions() {
    if (patientExist(patient.id)) {
      patient.medicament = updatePrescriptios();
      update(patient);
      addToast("Sucesso", "sucess");
      closeModal();
    }
  }
  function handleUpdateExams() {
    if (patientExist(patient.id)) {
      patient.exams = updateExamp();
      update(patient);
      addToast("Sucesso", "sucess");
      closeModal();
    }
  }

  function toggleMedicamentStatus() {
    const newState =
      medicamentStatus === PrescriptionSatus.ADMINISTERING
        ? PrescriptionSatus.SUSPENDED
        : PrescriptionSatus.ADMINISTERING;
    setMedicamentStatus(newState);
  }
  function toggleExamStatus() {
    const newState =
      examStatus === ExamStatus.DONE ? ExamStatus.IN_PROGRESS : ExamStatus.DONE;
    setExamStatus(newState);
    setRealizationExamData(new Date());
  }

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
              <span onClick={toggleExamStatus}>{examStatus}</span>
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
                {!edit && <Save onClick={handleUpdateExams}>Salvar</Save>}
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
              <span onClick={toggleMedicamentStatus}>{medicamentStatus}</span>
            </SatusLine>
            <Save onClick={handleUpdatePrescriptions}>Salvar</Save>
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
