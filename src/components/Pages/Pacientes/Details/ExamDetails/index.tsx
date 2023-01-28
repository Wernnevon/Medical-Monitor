import React, { useState } from "react";
import Patient, {
  Exam,
  Prescription,
} from "../../../../../Infra/DAOarchive/model";
import { update } from "../../../../../Infra/DAOarchive/patientDAO";
import { useToastContext } from "../../../../Components/Context/Toast";
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
    prescription?.administering,
  );
  const [examStatus, setExamStatus] = useState(exam?.done);
  const [realizationExamData, setRealizationExamData] = useState<Date>(
    new Date(),
  );

  const [examDiag, setExamDiag] = useState("");

  const addToast = useToastContext();

  function updatePrescriptios() {
    let { medicament: prescriptions } = patient;
    const prescriptionUpdateIndex = prescriptions.findIndex(
      (prescription) => prescription.medicament === prescription.medicament,
    );
    prescriptions[prescriptionUpdateIndex].administering = !!medicamentStatus;

    return [...prescriptions];
  }

  function updateExamp() {
    let { exams } = patient;
    const examUpdateIndex = exams.findIndex(
      (exame) => exame.name === exam?.name,
    );
    exams[examUpdateIndex].done = !!examStatus;
    exams[examUpdateIndex].realizationDate = realizationExamData;
    exams[examUpdateIndex].diagnosis = examDiag;

    return [...exams];
  }

  function handleUpdatePrescriptions() {
    if (patientExist(patient.personalData.id)) {
      patient.medicament = updatePrescriptios();
      update(patient);
      addToast("Sucesso", "sucess");
      closeModal();
    }
  }
  function handleUpdateExams() {
    if (patientExist(patient.personalData.id)) {
      patient.exams = updateExamp();
      update(patient);
      addToast("Sucesso", "sucess");
      closeModal();
    }
  }

  function toggleMedicamentStatus() {
    setMedicamentStatus(!medicamentStatus);
  }
  function toggleExamStatus() {
    setExamStatus(!examStatus);
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
                {examStatus ? (
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
              <span onClick={toggleExamStatus}>
                {examStatus ? "Realizado" : "Em Andamento"}
              </span>
            </SatusLine>
            <DiagnosisLine>
              <label>Situação:</label>
              <span>{exam.diagnosis}</span>
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
            <div>
              <label>Data de prescrição:</label>
              <span>{new Date(prescription.date).toLocaleDateString()}</span>
            </div>
            <div>
              <label onClick={toggleMedicamentStatus}>
                {!medicamentStatus ? "Administrando" : "Suspenso"}
              </label>
            </div>
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
