import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import Input from "../../../../Components/Input";
import * as Yup from "yup";
import GetErros from "../../../../Components/Utils/getErrors";
import { Container, FormContainer, FormContent } from "./styles";
import Button from "../../../../Components/Buttons";
import Patient, { PersonalData } from "../../../../../Infra/DAOarchive/model";

interface StepPersonalDataProps {
  patient: Patient;
  next: () => void;
  setPersonalData: React.Dispatch<React.SetStateAction<Patient>>;
}

const StepPersonalData: React.FC<StepPersonalDataProps> = ({
  next,
  patient,
  setPersonalData,
}: StepPersonalDataProps) => {
  const formRef = useRef({} as FormHandles);

  const handleAdvance = useCallback(async (data: PersonalData) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required("Preencha o nome completo do paciente"),
        motherName: Yup.string().required(
          "Preencha o nome completo da mão do paciente",
        ),
        fatherName: Yup.string().required(
          "Preencha o nome completo do pai do paciente",
        ),
        birthday: Yup.string().required(
          "Informe a data de nascimento do paciente",
        ),
        rg: Yup.string().required("Informe o RG"),
        cpf: Yup.string().required("Informe o CPF"),
        gender: Yup.string().required("Informe o gênero"),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      setPersonalData({
        ...patient,
        personalData: data,
      });
      formRef.current.setErrors({});
      formRef.current.reset();
      next();
    } catch (err) {
      console.log(data);
      if (err instanceof Yup.ValidationError) {
        const errors = GetErros(err);
        formRef.current.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <FormContainer onSubmit={handleAdvance} ref={formRef}>
        <FormContent>
          <Input placeholder="Nome completo" name="name" type="text" />
          <Input placeholder="Nome da mãe" name="motherName" type="text" />
          <Input placeholder="Nome do pai" name="fatherName" type="text" />
          <Input placeholder="Data de Nascimento" name="birthday" type="date" />
          <Input placeholder="RG" name="rg" type="text" />
          <Input placeholder="CPF" name="cpf" type="text" />
          <Input placeholder="Gênero" name="gender" type="text" />
          <Input placeholder="Fone" name="phone" type="text" />
        </FormContent>
        <Button typeBtn={{ type: "submit" }} typeStyle="submit">
          Avançar
        </Button>
      </FormContainer>
    </Container>
  );
};

export default StepPersonalData;
