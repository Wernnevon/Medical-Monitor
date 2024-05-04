import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import Input from "../../../../Components/Input";
import * as Yup from "yup";
import GetErros from "../../../../Components/Utils/getErrors";
import Button from "../../../../Components/Buttons";
import { useRegister } from "../../../../Components/Context/RegisterContext";
import { Patient } from "../../../../Infra/Entities";
import { useNavigate } from "react-router-dom";
import { ActionsContainer, FormContainer, FormContent } from "../styles";

const StepPersonalData: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef({} as FormHandles);
  const { addData, patient, changeStep, step } = useRegister();

  const handleAdvance = useCallback(
    async (data: Patient) => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Preencha o nome completo do paciente"),
          motherName: Yup.string().required(
            "Preencha o nome completo da mão do paciente"
          ),
          fatherName: Yup.string().required(
            "Preencha o nome completo do pai do paciente"
          ),
          birthday: Yup.string().required(
            "Informe a data de nascimento do paciente"
          ),
          rg: Yup.string().required("Informe o RG"),
          cpf: Yup.string().required("Informe o CPF"),
          gender: Yup.string().required("Informe o gênero"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        addData({
          ...patient,
          ...data,
        });
        formRef.current.setErrors({});
        changeStep(step + 1);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = GetErros(err);
          formRef.current.setErrors(errors);
        }
      }
    },
    [addData, changeStep, patient, step]
  );
  return (
    <FormContainer onSubmit={handleAdvance} ref={formRef}>
      <FormContent>
        <Input
          placeholder="Nome completo"
          name="name"
          type="text"
          value={patient && patient.name}
        />
        <Input
          placeholder="Nome da mãe"
          name="motherName"
          type="text"
          value={patient && patient.motherName}
        />
        <Input
          placeholder="Nome do pai"
          name="fatherName"
          type="text"
          value={patient && patient.fatherName}
        />
        <Input
          placeholder="Data de Nascimento"
          name="birthday"
          type="date"
          value={patient && patient.birthday}
        />
        <Input
          placeholder="RG"
          name="rg"
          type="text"
          value={patient && patient.rg}
        />
        <Input
          placeholder="CPF"
          name="cpf"
          type="text"
          value={patient && patient.cpf}
        />
        <Input
          placeholder="Gênero"
          name="gender"
          type="text"
          value={patient && patient.gender}
        />
        <Input
          placeholder="Fone"
          name="phone"
          type="text"
          value={patient && patient.phone}
        />
      </FormContent>
      <ActionsContainer>
        <Button
          typeBtn={{ type: "button" }}
          typeStyle="back"
          handle={() => navigate(-1)}
        >
          Cancelar
        </Button>
        <Button typeBtn={{ type: "submit" }} typeStyle="submit">
          Avançar
        </Button>
      </ActionsContainer>
    </FormContainer>
  );
};

export default StepPersonalData;
