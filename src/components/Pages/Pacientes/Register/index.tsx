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
import Patient from "../../../../Infra/DAOarchive/model";
import EndPhase from "./StepEndPhase";

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const addToast = useToastContext();
  const sucessMensage = "Paciente cadastrado com sucesso";

  const handleSubmit = useCallback(async () => {
    console.log("@@", patient);
    addToast(sucessMensage, AlertTypes.SUCESS);
    try {
      await create(patient);
    } catch (err) {
      console.error(err);
    }

    // setStep(1);
  }, [patient]);

  function switchRender(params: number) {
    switch (params) {
      case 1:
        return (
          <StepPersonalData
            patient={patient}
            setPersonalData={setPatient}
            next={next}
          />
        );
      case 2:
        return (
          <StepAdressData
            patient={patient}
            setPersonalData={setPatient}
            next={next}
            back={prev}
          />
        );
      case 3:
        return (
          <StepHealth
            patient={patient}
            setPersonalData={setPatient}
            back={prev}
            next={next}
          />
        );
      case 4:
        return <EndPhase patient={patient} changeStep={setStep} back={prev} />;
    }
  }

  function next() {
    const nextStep = step > 3 ? step : step + 1;
    setStep(nextStep);
  }
  function prev() {
    const prevStep = step < 2 ? step : step - 1;
    setStep(prevStep);
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
      <FormContainer>{switchRender(step)}</FormContainer>
      {step === 4 ? <Submit onClick={handleSubmit}>Cadastrar</Submit> : <></>}
    </Container>
  );
};

export default Register;
