import React, { Dispatch, SetStateAction } from "react";
import { FiEdit } from "react-icons/fi";
import Patient from "../../../../../Infra/DAOarchive/model";
import Button from "../../../../Components/Buttons";
import { useRegister } from "../../../../Components/Context/RegisterContext";
import { Container, DataContainer, List, TitleContainer } from "./styles";

export default function EndPhase() {
  const { patient, changeStep, step } = useRegister();
  const { personalData, health, adress } = patient;

  return (
    <Container>
      <DataContainer>
        <TitleContainer>
          <b>Dados pessoais</b>
          <FiEdit onClick={() => changeStep(1)} color="#03a696" size={25} />
        </TitleContainer>
        <List>
          <li>
            <span>Nome:</span> {personalData.name}
          </li>
          <li>
            <span>Nascimento:</span>{" "}
            {new Date(personalData.birthday).toLocaleDateString()}
          </li>
          <li>
            <span>Nome do Pai:</span> {personalData.fatherName}
          </li>
          <li>
            <span>Nome da Mãe:</span> {personalData.motherName}
          </li>
          <li>
            <span>Sexo:</span> {personalData.gender}
          </li>
          {personalData.phone && (
            <li>
              <span>Contato:</span> {personalData.phone}
            </li>
          )}
          <li>
            <span>CPF:</span> {personalData.cpf}
          </li>
          <li>
            <span>RG:</span> {personalData.rg}
          </li>
        </List>
        <TitleContainer>
          <b>Endereço</b>{" "}
          <FiEdit onClick={() => changeStep(2)} color="#03a696" size={25} />
        </TitleContainer>
        <List>
          <li>
            <span>Rua:</span> {adress.street}
          </li>
          <li>
            <span>Numero:</span> {adress.number}
          </li>
          <li>
            <span>Bairro:</span> {adress.neighborhood}
          </li>
          <li>
            <span>Cidade:</span> {adress.city}
          </li>
          {adress.complement && (
            <li>
              <span>Complemento:</span> {adress.complement}
            </li>
          )}
        </List>
        <TitleContainer>
          <b>Saúde</b>{" "}
          <FiEdit onClick={() => changeStep(3)} color="#03a696" size={25} />
        </TitleContainer>
        <List>
          <li>
            <span>Convênio:</span> {health.helthInsurance}
          </li>
          {health.allergy && (
            <li>
              <span>Alergias:</span> {health.allergy}
            </li>
          )}
          {health.height && (
            <li>
              <span>Altura:</span> {health.height}m
            </li>
          )}
          {health.weight && (
            <li>
              <span>Peso:</span> {health.weight}kg
            </li>
          )}
        </List>
      </DataContainer>
      <Button
        typeBtn={{ type: "button" }}
        handle={() => changeStep(step - 1)}
        typeStyle="back"
      >
        Voltar
      </Button>
    </Container>
  );
}
