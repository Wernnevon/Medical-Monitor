import React, { useState } from "react";
import Patient, { Exam, Prescription } from "../../../Infra/DAOarchive/model";
import Modal from "../../../Components/Modal";
import Anamnese from "./Anamnese";
import ExamDetails from "./ExamDetails";

import { Container, Card, CardItem, CardText } from "./styles";

enum ModalStrategyOpen {
  EXAM = "exam",
  PRESC = "precription",
  ANMN = "anamnese",
}

interface Props {
  patient: Patient;
}

const Details: React.FC<Props> = ({ patient }: Props) => {
  const [modalState, setModalState] = useState(false);
  const [exam, setExam] = useState<Exam>({} as Exam);
  const [prescription, setPrescription] = useState<Prescription>(
    {} as Prescription
  );
  const [anamnses, setAnamneses] = useState(false);

  function closeModal() {
    setModalState(!modalState);
    if (anamnses) setAnamneses(false);
  }
  function openModalExam(exam: Exam) {
    setPrescription({} as Prescription);
    setExam({ ...exam });
    setModalState(true);
  }

  function openModalPrescription(prescription: Prescription) {
    setExam({} as Exam);
    setPrescription({ ...prescription });
    setModalState(true);
  }

  function openModalAnamnese() {
    setModalState(true);
    setAnamneses(true);
  }

  const openStrategy = {
    [ModalStrategyOpen.EXAM]: openModalExam,
    [ModalStrategyOpen.PRESC]: openModalPrescription,
    [ModalStrategyOpen.ANMN]: openModalAnamnese,
  };

  function calculaIdade(nascimento: Date) {
    const hoje = new Date();
    const birthday = new Date(nascimento);
    return Math.floor(
      Math.ceil(
        Math.abs(birthday.getTime() - hoje.getTime()) / (1000 * 3600 * 24)
      ) / 365.25
    );
  }

  const getDate = (): string => {
    const [y, m, d] = patient.personalData.birthday.toString().split("-");
    return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString();
  };
  return (
    <Container>
      <Modal modalState={modalState} closeModal={closeModal}>
        {anamnses ? (
          <Anamnese patient={patient} closeModal={closeModal} />
        ) : (
          <ExamDetails
            patient={patient}
            exam={exam}
            prescription={prescription}
            closeModal={closeModal}
          />
        )}
      </Modal>
      <Card>
        <p>Dados Pessoais</p>
        <CardText>
          <label>Nome: </label>
          <label>{patient.personalData.name}</label>
        </CardText>
        <CardText>
          <label>Nome da mãe: </label>
          <label>{patient.personalData.motherName}</label>
        </CardText>
        <CardText>
          <label>Nome do Pai: </label>
          <label>{patient.personalData.fatherName}</label>
        </CardText>
        <CardText>
          <label>Data de Nascimento: </label>
          <label>{getDate()}</label>
        </CardText>
        <CardText>
          <label>Idade: </label>
          <label>{calculaIdade(patient.personalData.birthday)} anos</label>
        </CardText>
        <CardText>
          <label>Convênio: </label>
          <label>{patient.health.helthInsurance}</label>
        </CardText>
        <CardText>
          <label>RG: </label>
          <label>{patient.personalData.rg}</label>
        </CardText>
        <CardText>
          <label>CPF: </label>
          <label>{patient.personalData.cpf}</label>
        </CardText>
        <CardText>
          <label>Gênero: </label>
          <label>{patient.personalData.gender}</label>
        </CardText>
        {patient.personalData.phone && (
          <CardText>
            <label>Telefone: </label>
            <label>{patient.personalData.phone}</label>
          </CardText>
        )}
      </Card>
      <Card>
        <h4>Endereço</h4>
        <CardText>
          <label>Rua: </label>
          <label>{patient.adress.street}</label>
        </CardText>
        <CardText>
          <label>Bairro: </label>
          <label>{patient.adress.neighborhood}</label>
        </CardText>
        <CardText>
          <label>Número: </label>
          <label>
            {patient.adress.number === 0 ? "S/N" : patient.adress.number}
          </label>
        </CardText>
        {patient.adress.complement && (
          <CardText>
            <label>Complemento: </label>
            <label>{patient.adress.complement}</label>
          </CardText>
        )}
        <CardText>
          <label>Cidade: </label>
          <label>{patient.adress.city}</label>
        </CardText>
      </Card>
      <Card>
        <h4>Saúde</h4>
        <CardText>
          <label>Alergias: </label>
          <label>{patient.health.allergy}</label>
        </CardText>
        <CardText>
          <label>Peso: </label>
          <label>{patient.health.weight} kg</label>
        </CardText>
        <CardText>
          <label>Altura: </label>
          <label>{patient.health.height} cm</label>
        </CardText>
      </Card>
      <Card>
        <CardItem>
          <span style={{ fontWeight: 600, textTransform: "uppercase" }}>
            Anamnese
          </span>
          <button onClick={openStrategy[ModalStrategyOpen.ANMN]}>Abrir</button>
        </CardItem>
      </Card>
      {patient.exams && (
        <Card>
          <h4>Exames</h4>
          {patient.exams.length > 0 &&
            patient.exams.map((exam: Exam) => (
              <CardItem key={exam.name}>
                <span>{exam.name}</span>
                <button
                  onClick={() => openStrategy[ModalStrategyOpen.EXAM](exam)}
                >
                  Abrir
                </button>
              </CardItem>
            ))}
        </Card>
      )}
      {patient.medicament && (
        <Card>
          <h4>Prescrições</h4>
          {patient.medicament.length > 0 &&
            patient.medicament.map((prescription: Prescription) => (
              <CardItem key={prescription.medicament}>
                <span>{prescription.medicament}</span>
                <button
                  onClick={() =>
                    openStrategy[ModalStrategyOpen.PRESC](prescription)
                  }
                >
                  Abrir
                </button>
              </CardItem>
            ))}
        </Card>
      )}
    </Container>
  );
};
export default Details;
