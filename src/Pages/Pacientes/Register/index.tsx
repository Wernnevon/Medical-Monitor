/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-duplicate-case */
import React, { useCallback } from "react";
import StepPersonalData from "./StepPersonalData";
import { useToastContext } from "../../../Components/Context/Toast";
import stepSvgNoActived from "../../../assests/SVGSs/stepCard.svg";
import stepSvgActived from "../../../assests/SVGSs/stepCardActive.svg";

import {
  RegisterCard,
  FormWrapper,
  StepProgressCard,
  StepProgressContainer,
  TitleWrapper,
} from "./styles";
import { AlertTypes } from "../../../Components/Utils/ToastConfigs";
import StepAdressData from "./StepAdress";
import StepHealth from "./StepHealth";
import EndPhase from "./StepEndPhase";
import { useRegister } from "../../../Components/Context/RegisterContext";
import { PacienteCard, PacienteContainer } from "../styles";
import { HiUserGroup } from "react-icons/hi";

type StepProps = {
  [key: number]: any;
};

const Register: React.FC = () => {
  const { step } = useRegister();
  const addToast = useToastContext();
  const sucessMensage = "Paciente cadastrado com sucesso";

  const submit = useCallback(async () => {
    try {
      addToast(sucessMensage, AlertTypes.SUCESS);
    } catch (err) {
      addToast("Erro no cadastro", AlertTypes.ERROR);
      console.error(err);
    }
  }, [addToast]);

  const Step: StepProps = {
    1: <StepPersonalData />,
    2: <StepAdressData />,
    3: <StepHealth />,
    4: <EndPhase onSubmit={submit} />,
  };

  function handleSetColor(current: number) {
    const active = "#FFF";
    const inactive = "#555";
    return current === step ? active : inactive;
  }
  function handleSetBackground(current: number) {
    const inactive = stepSvgNoActived;
    const active = stepSvgActived;
    return current === step ? active : inactive;
  }
  return (
    <PacienteContainer>
      <PacienteCard>
        <RegisterCard>
          <TitleWrapper>
            <HiUserGroup
              color="#03a696"
              size={40}
              style={{ position: "relative", bottom: ".15rem" }}
            />
            <label>Novo Paciente</label>
          </TitleWrapper>
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
          <FormWrapper>{Step[step]}</FormWrapper>
        </RegisterCard>
      </PacienteCard>
    </PacienteContainer>
  );
};

export default Register;
