import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import Input from "../../../../Components/Input";
import * as Yup from "yup";
import GetErros from "../../../../Components/Utils/getErrors";
import { Container, FormContainer, FormContent } from "./styles";
import Button from "../../../../Components/Buttons";
import Patient, { Health } from "../../../../../Infra/DAOarchive/model";

interface StepHealthProps {
  next: () => void;
  back: () => void;
  patient: Patient;
  setPersonalData: React.Dispatch<React.SetStateAction<Patient>>;
}

const StepHealth: React.FC<StepHealthProps> = ({
  next,
  back,
  patient,
  setPersonalData,
}: StepHealthProps) => {
  const formRef = useRef({} as FormHandles);

  const handleAdvance = useCallback(async (data: Health) => {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        helthInsurance: Yup.string(),
        allergy: Yup.string().optional(),
        weight: Yup.number().optional(),
        height: Yup.number().optional(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      setPersonalData({
        ...patient,
        health: data,
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
          <Input placeholder="Convênio" name="helthInsurance" type="text" />
          <Input placeholder="Alergias" name="allergy" type="text" />
          <Input placeholder="Peso" name="weight" type="number" />
          <Input placeholder="Altura" name="height" type="number" />
        </FormContent>
        <Button typeBtn={{ type: "submit" }} typeStyle="submit">
          Avançar
        </Button>
        <Button typeBtn={{ type: "button" }} handle={back} typeStyle="back">
          Voltar
        </Button>
      </FormContainer>
    </Container>
  );
};

export default StepHealth;
