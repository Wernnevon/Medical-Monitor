import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import Input from "../../../../Components/Input";
import * as Yup from "yup";
import GetErros from "../../../../Utils/getErrors";
import Button from "../../../../Components/Buttons";
import { useRegister } from "../../../../Hooks/useRegister/RegisterContext";
import { Health } from "../../../../Infra/Entities";
import { ActionsContainer, FormContainer, FormContent } from "../styles";

const StepHealth: React.FC = () => {
  const formRef = useRef({} as FormHandles);
  const { addData, patient, step, changeStep } = useRegister();
  const handleAdvance = useCallback(
    async (data: Health) => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          healthInsurance: Yup.string(),
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
    <FormContainer onSubmit={handleAdvance} ref={formRef}>
      <FormContent>
        <Input
          value={patient.health && patient.health.healthInsurance}
          placeholder="Convênio"
          name="healthInsurance"
          type="text"
        />
        <Input
          value={patient.health && patient.health.allergy}
          placeholder="Alergias"
          name="allergy"
          type="text"
        />
        <Input
          value={patient.health && patient.health.weight}
          placeholder="Peso"
          title="Peso em quilos (KG)"
          name="weight"
          type="number"
        />
        <Input
          value={patient.health && patient.health.height}
          placeholder="Altura"
          name="height"
          type="number"
          title="Altura em centimetros (cm)"
        />
      </FormContent>
      <ActionsContainer>
        <Button
          typeBtn={{ type: "button" }}
          handle={() => changeStep(step - 1)}
          typeStyle="back"
        >
          Voltar
        </Button>
        <Button typeBtn={{ type: "submit" }} typeStyle="submit">
          Avançar
        </Button>
      </ActionsContainer>
    </FormContainer>
  );
};

export default StepHealth;
