import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import Input from "../../../../Components/Input";
import * as Yup from "yup";
import GetErros from "../../../../Components/Utils/getErrors";
import { Container, FormContainer, FormContent } from "./styles";
import Button from "../../../../Components/Buttons";
import { Address } from "../../../../Infra/DAOarchive/model";
import { useRegister } from "../../../../Components/Context/RegisterContext";

const StepAdressData: React.FC = () => {
  const formRef = useRef({} as FormHandles);
  const { patient, changeStep, step, addData } = useRegister();

  const handleAdvance = useCallback(
    async (data: Address) => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          city: Yup.string().required("Informe a cidade do paciente"),
          neighborhood: Yup.string().required("Informe o bairro"),
          street: Yup.string().required("Informe a rua"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        addData({
          ...patient,
          adress: data,
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
          <Input
            value={patient.adress && patient.adress.street}
            placeholder="Rua"
            name="street"
            type="text"
          />
          <Input
            value={patient.adress && patient.adress.number}
            placeholder="Número"
            title='Digite "0" para sem número'
            name="number"
            type="number"
          />
          <Input
            value={patient.adress && patient.adress.neighborhood}
            placeholder="Bairro"
            name="neighborhood"
            type="text"
          />
          <Input
            value={patient.adress && patient.adress.complement}
            placeholder="Complemento"
            name="complement"
            type="text"
          />
          <Input
            value={patient.adress && patient.adress.city}
            placeholder="Cidade"
            name="city"
            type="text"
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

export default StepAdressData;
