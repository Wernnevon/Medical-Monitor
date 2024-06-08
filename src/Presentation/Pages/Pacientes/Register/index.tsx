/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useCallback, useEffect } from "react";
import StepPersonalData from "./StepPersonalData";
import { useToast } from "../../../Hooks";
import stepSvgNoActived from "../../../../Assets/SVGs/stepCard.svg";
import stepSvgActived from "../../../../Assets/SVGs/stepCardActive.svg";

import mock from "../../../../Infra/DB/db.json";

import {
  RegisterCard,
  FormWrapper,
  StepProgressCard,
  StepProgressContainer,
  TitleWrapper,
} from "./styles";
import { ToastTypes } from "../../../Hooks/useToast/ToastConfigs";
import StepAdressData from "./StepAdress";
import StepHealth from "./StepHealth";
import EndPhase from "./StepEndPhase";
import { useRegister } from "../../../Hooks";
import { PacienteCard, PacienteContainer } from "../List/styles";

import {
  makeLocalPatientFind,
  makeLocalPatientStore,
  makeLocalPatientUpdate,
} from "../../../../Main/Factories";
import { useNavigate, useParams } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";
import { FaUserEdit } from "react-icons/fa";

type StepProps = {
  [key: number]: any;
};

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { step, patient, addData } = useRegister();
  const addToast = useToast();
  const sucessMensage = {
    store: "Paciente cadastrado com sucesso",
    update: "Dados do paciente foram atualizados com sucesso",
  };
  const patientStore = makeLocalPatientStore();
  const patientFind = makeLocalPatientFind();
  const patientUpdate = makeLocalPatientUpdate();

  // on dev mode
  function fillPatientDB() {
    mock.forEach((data) => {
      data.birthday = new Date(Date.parse(data.birthday))
        .toISOString()
        .substring(0, 10);
      patientStore.store({ data });
    });
  }

  useEffect(() => {
    if (id) {
      patientFind.findOne({ query: id }).then(([data]: any) => {
        addData({ ...data });
      });
    }
  }, []);

  const submit = useCallback(async () => {
    console.log(patient);
    if (id) {
      await patientUpdate
        .update({ data: patient })
        .then(() => {
          addToast(sucessMensage.update, ToastTypes.SUCESS);
          navigate(-1);
        })
        .catch((err) => {
          addToast("Erro na atualização", ToastTypes.ERROR);
          console.error(err);
        });
    } else {
      await patientStore
        .store({ data: patient })
        .then(() => {
          addToast(sucessMensage.store, ToastTypes.SUCESS);
          navigate(-1);
        })
        .catch((err) => {
          addToast("Erro no cadastro", ToastTypes.ERROR);
          console.error(err);
        });
    }
  }, [addToast, patient]);

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
      <button
        style={{ position: "absolute", top: "0.5rem", left: "16vw" }}
        onClick={fillPatientDB}
      >
        fill
      </button>
      <PacienteCard>
        <RegisterCard>
          <TitleWrapper>
            {id ? (
              <FaUserEdit
                color="#03a696"
                size={40}
                style={{ position: "relative", bottom: ".15rem" }}
              />
            ) : (
              <IoPersonAdd
                color="#03a696"
                size={40}
                style={{ position: "relative", bottom: ".15rem" }}
              />
            )}
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
