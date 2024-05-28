import React from "react";
import { FiEdit } from "react-icons/fi";
import Button from "../../../../Components/Buttons";
import { useRegister } from "../../../../Hooks/useRegister/RegisterContext";
import { Container, DataContainer, List, TitleContainer } from "./styles";
import { ActionsContainer } from "../styles";

type Props = {
  onSubmit(): void;
};

const EndPhase: React.FC<Props> = ({ onSubmit }: Props) => {
  const { patient, changeStep, step } = useRegister();
  const { health, adress } = patient;

  function handleSubmit() {
    if (onSubmit) onSubmit();
  }

  return (
    <Container>
      <DataContainer>
        <TitleContainer titleSpace={11}>
          <b>Dados pessoais</b>
          <FiEdit onClick={() => changeStep(1)} color="#03a696" size={25} />
        </TitleContainer>
        <List>
          <li>
            <span>Nome:</span> {patient.name}
          </li>
          <li>
            <span>Nascimento:</span>
            {new Date(patient.birthday).toLocaleDateString()}
          </li>
          <li>
            <span>Nome do Pai:</span> {patient.fatherName}
          </li>
          <li>
            <span>Nome da Mãe:</span> {patient.motherName}
          </li>
          <li>
            <span>Sexo:</span> {patient.gender}
          </li>
          <li>
            <span>Contato:</span>
            {patient.phone ? patient.phone : " Não informado"}
          </li>
          <li>
            <span>CPF:</span> {patient.cpf}
          </li>
          <li>
            <span>RG:</span> {patient.rg}
          </li>
        </List>
        <TitleContainer titleSpace={7}>
          <b>Endereço</b>
          <FiEdit onClick={() => changeStep(2)} color="#03a696" size={25} />
        </TitleContainer>
        <List>
          <li>
            <span>Rua:</span> {adress.street}
          </li>
          <li>
            <span>Numero:</span> {adress.number ? adress.number : "S/N"}
          </li>
          <li>
            <span>Bairro:</span> {adress.neighborhood}
          </li>
          <li>
            <span>Cidade:</span> {adress.city}
          </li>
          <li>
            <span>Complemento:</span>
            {adress.complement ? adress.complement : " Sem complemento"}
          </li>
        </List>
        <TitleContainer titleSpace={5}>
          <b>Saúde</b>
          <FiEdit onClick={() => changeStep(3)} color="#03a696" size={25} />
        </TitleContainer>
        <List>
          <li>
            <span>Convênio:</span>
            {health.healthInsurance ? health.healthInsurance : " Não informado"}
          </li>
          <li>
            <span>Alergias:</span>
            {health.allergy ? health.allergy : " Não informado"}
          </li>
          {health.height && (
            <li>
              <span>Altura:</span> {health.height}cm
            </li>
          )}
          {health.weight && (
            <li>
              <span>Peso:</span> {health.weight}kg
            </li>
          )}
        </List>
      </DataContainer>
      <ActionsContainer>
        <Button
          typeBtn={{ type: "button" }}
          handle={() => changeStep(step - 1)}
          typeStyle="back"
        >
          Voltar
        </Button>
        <Button
          typeBtn={{ type: "submit" }}
          typeStyle="submit"
          handle={handleSubmit}
        >
          Concluir
        </Button>
      </ActionsContainer>
    </Container>
  );
};

export default EndPhase;
