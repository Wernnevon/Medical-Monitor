import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import Input from "../../../../Components/Input";
import * as Yup from "yup";
import GetErros from "../../../../Components/Utils/getErrors";
import { Container, FormContainer, FormContent } from "./styles";
import Button from "../../../../Components/Buttons";
import { Health } from "../../../../Infra/DAOarchive/model";
import { useRegister } from "../../../../Components/Context/RegisterContext";

const StepHealth: React.FC = () => {
  const formRef = useRef({} as FormHandles);
  const { addData, patient, step, changeStep } = useRegister();
  const handleAdvance = useCallback(
    async (data: Health) => {
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
        addData({
          ...patient,
          health: data,
        });
        formRef.current.setErrors({});
        changeStep(step + 1);
      } catch (err) {
        console.log(data);
        if (err instanceof Yup.ValidationError) {
          const errors = GetErros(err);
          formRef.current.setErrors(errors);
        }
      }
    },
    [addData, changeStep, patient, step]
  );

  return (
    <Container>
      <FormContainer onSubmit={handleAdvance} ref={formRef}>
        <FormContent>
          <Input placeholder="Convênio" name="helthInsurance" type="text" />
          <Input placeholder="Alergias" name="allergy" type="text" />
          <Input
            placeholder="Peso"
            title="Peso em quilos (KG)"
            name="weight"
            type="number"
          />
          <Input
            placeholder="Altura"
            name="height"
            type="number"
            title="Altura em centimetros (cm)"
            value="100"
          />
        </FormContent>
        <Button typeBtn={{ type: "submit" }} typeStyle="submit">
          Avançar
        </Button>
        <Button
          typeBtn={{ type: "button" }}
          handle={() => changeStep(step - 1)}
          typeStyle="back"
        >
          Voltar
        </Button>
      </FormContainer>
    </Container>
  );
};

export default StepHealth;
