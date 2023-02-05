/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-duplicate-case */
import React, { useCallback } from "react";
import StepPersonalData from "./StepPersonalData";
import { useToastContext } from "../../../Components/Context/Toast";
import stepSvgNoActived from "../../../assests/SVGSs/stepCard.svg";
import stepSvgActived from "../../../assests/SVGSs/stepCardActive.svg";

import {
  Container,
  FormContainer,
  Submit,
  Title,
  StepProgressCard,
  StepProgressContainer,
} from "./styles";

import { AlertTypes } from "../../../Components/Utils/ToastConfigs";
import StepAdressData from "./StepAdress";
import StepHealth from "./StepHealth";
import EndPhase from "./StepEndPhase";
import { useRegister } from "../../../Components/Context/RegisterContext";
import { create } from "../../../Infra/DAOarchive/patientDAO";

interface RegisterProps {
  isOpen: boolean;
  close: Function;
}

const Register: React.FC<RegisterProps> = ({
  isOpen,
  close,
}: RegisterProps) => {
  const { patient, step } = useRegister();
  const addToast = useToastContext();
  const sucessMensage = "Paciente cadastrado com sucesso";

  const handleSubmit = useCallback(async () => {
    try {
      addToast(sucessMensage, AlertTypes.SUCESS);
      await create(patient);
    } catch (err) {
      addToast("Erro no cadastro", AlertTypes.ERROR);
      console.error(err);
    }
    close();
  }, [addToast, close, patient]);

  function switchRender() {
    switch (step) {
      case 1:
        return <StepPersonalData />;
      case 2:
        return <StepAdressData />;
      case 3:
        return <StepHealth />;
      case 4:
        return <EndPhase />;
    }
  }

  function handleSetColor(current: number) {
    const active = "#FFF";
    const noActive = "#555";
    switch (step) {
      case current:
        return active;
      case current:
        return active;
      case current:
        return active;
      case current:
        return active;
      default:
        return noActive;
    }
  }
  function handleSetBackground(current: number) {
    const noActive = stepSvgNoActived;
    const active = stepSvgActived;
    switch (step) {
      case current:
        return active;
      case current:
        return active;
      case current:
        return active;
      case current:
        return active;
      default:
        return noActive;
    }
  }
  const renderContent = () => {
    if (isOpen) {
      return (
        <Container>
          <Title>Novo Paciente</Title>
          <StepProgressContainer>
            <StepProgressCard color={handleSetColor(1)}>
              <img draggable="false" src={handleSetBackground(1)} />
              <label>Dados Pessoais</label>
            </StepProgressCard>
            <StepProgressCard color={handleSetColor(2)}>
              <img draggable="false" src={handleSetBackground(2)} />
              <label>Endereço</label>
            </StepProgressCard>
            <StepProgressCard color={handleSetColor(3)}>
              <img draggable="false" src={handleSetBackground(3)} />
              <label>Saúde</label>
            </StepProgressCard>
            <StepProgressCard color={handleSetColor(4)}>
              <img draggable="false" src={handleSetBackground(4)} />
              <label>Conclusão</label>
            </StepProgressCard>
          </StepProgressContainer>
          <FormContainer>{switchRender()}</FormContainer>
          {step === 4 ? (
            <Submit onClick={handleSubmit}>Cadastrar</Submit>
          ) : (
            <></>
          )}
        </Container>
      );
    }
    return <></>;
  };

  return renderContent();
};

export default Register;
