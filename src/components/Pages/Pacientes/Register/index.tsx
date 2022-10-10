import React, { useCallback, useRef, useState } from "react";
import StepPersonalData from "./StepPersonalData";
import { useToastContext } from "../../../Components/Context/Toast";
import { create } from "../../../../Infra/DAOarchive/patientDAO";
import stepSvgNoActived from "../../../../assests/SVGSs/stepCard.svg";
import stepSvgActived from "../../../../assests/SVGSs/stepCardActive.svg";

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

const Register: React.FC = () => {
  const { patient, changeStep, step } = useRegister();
  const addToast = useToastContext();
  const sucessMensage = "Paciente cadastrado com sucesso";

  const handleSubmit = useCallback(async () => {
    console.log("@@", patient);
    try {
      addToast(sucessMensage, AlertTypes.SUCESS);
      await create(patient);
    } catch (err) {
      addToast("Erro no cadastro", AlertTypes.ERROR);
      console.error(err);
    }
    changeStep(1);
  }, [patient]);

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
      {step === 4 ? <Submit onClick={handleSubmit}>Cadastrar</Submit> : <></>}
    </Container>
  );
};

export default Register;
