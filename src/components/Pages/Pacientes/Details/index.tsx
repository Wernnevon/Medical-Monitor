import React, { FC, useState } from "react";
import Patient, {
  Exam,
  Prescription,
} from "../../../../Infra/DAOarchive/model";
import Modal from "../../../Components/Modal";
import ExamDetails from "./ExamDetails";

import { Container, Card, CardItem, CardText } from "./styles";

interface Props {
  patient: Patient;
}

const Details: React.FC<Props> = ({ patient }: Props) => {
  const [modalState, setModalState] = useState(false);
  const [exam, setExam] = useState<Exam>({} as Exam);
  const [prescription, setPrescription] = useState<Prescription>(
    {} as Prescription,
  );

  function closeModal() {
    setModalState(!modalState);
  }
  function openModalExam(exam: Exam) {
    setExam(exam);
    setPrescription({} as Prescription);
    setModalState(true);
  }
  function openModalPrescription(prescription: Prescription) {
    setPrescription(prescription);
    setExam({} as Exam);
    setModalState(true);
  }

  function calculaIdade(nascimento: Date) {
    const hoje = new Date();
    const birthday = new Date(nascimento);
    return Math.floor(
      Math.ceil(
        Math.abs(birthday.getTime() - hoje.getTime()) / (1000 * 3600 * 24),
      ) / 365.25,
    );
  }
  return (
    <Container>
      <Modal
        modalState={modalState}
        closeModal={closeModal}
        component={<ExamDetails exam={exam} prescription={prescription} />}
      />
      <Card>
        <h4>Dados Pessoais</h4>
        <CardText>
          <label>Nome: </label>
          <label>{patient.name}</label>
        </CardText>
        <CardText>
          <label>Nome da mãe: </label>
          <label>{patient.motherName}</label>
        </CardText>
        <CardText>
          <label>Data de Nascimento: </label>
          <label>{new Date(patient.birthday).toLocaleDateString()}</label>
        </CardText>
        <CardText>
          <label>Idade: </label>
          <label>{calculaIdade(patient.birthday)}</label>
        </CardText>
        <CardText>
          <label>Nome do Pai: </label>
          <label>{patient.fatherName}</label>
        </CardText>
        <CardText>
          <label>Convênio: </label>
          <label>{patient.helthInsurance}</label>
        </CardText>
        <CardText>
          <label>RG: </label>
          <label>{patient.rg}</label>
        </CardText>
        <CardText>
          <label>CPF: </label>
          <label>{patient.cpf}</label>
        </CardText>
        <CardText>
          <label>Gênero: </label>
          <label>{patient.gender}</label>
        </CardText>
        <CardText>
          <label>Telefone: </label>
          <label>{patient.phone}</label>
        </CardText>
        <CardText>
          <label>Alergias: </label>
          <label>{patient.allergy}</label>
        </CardText>
        <CardText>
          <label>Peso: </label>
          <label>{patient.weight}</label>
        </CardText>
        <CardText>
          <label>Altura: </label>
          <label>{patient.height}</label>
        </CardText>
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
            {patient.adress.number == 0 ? "S/N" : patient.adress.number}
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
        <h4>Exames</h4>
        {patient.exams.length > 0 &&
          patient.exams.map((exam) => (
            <CardItem>
              <span>{exam.name}</span>
              <button onClick={() => openModalExam(exam)}>Abrir</button>
            </CardItem>
          ))}
      </Card>
      <Card>
        <h4>Prescrições</h4>
        {patient.medicament.length > 0 &&
          patient.medicament.map((prescription) => (
            <CardItem>
              <span>{prescription.medicament}</span>
              <button onClick={() => openModalPrescription(prescription)}>
                Abrir
              </button>
            </CardItem>
          ))}
      </Card>
    </Container>
  );
};
export default Details;
