import { FormHandles } from "@unform/core";
import React, { useCallback, useRef } from "react";
import * as Yup from "yup";
import { create } from "../../../../Infra/DAOarchive/patientDAO";
import Input from "../../../Components/Input";
import GetErros from "../../../Components/Utils/getErrors";

import { Container, FormContainer, Submit, Title } from "./styles";

const Register: React.FC = () => {
  const formRef = useRef({} as FormHandles);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current.setErrors({});
        
        const schema = Yup.object().shape({
          name: Yup.string().required('Preencha o nome completo do paciente'),
          motherName: Yup.string().required('Preencha o nome completo da mão do paciente'),
          fatherName: Yup.string().required('Preencha o nome completo do pai do paciente'),
          birthday: Yup.string().required('Informe a data de nascimento do paciente'),
          city: Yup.string().required('Informe a cidade do paciente'),
          neighborhood: Yup.string().required('Informe o bairro'),
          street: Yup.string().required('Informe a rua'),
          });
          await schema.validate(data, {
          abortEarly: false,
        });

        await create({
          name: data.name,
          motherName: data.motherName,
          birthday: data.birthday,
          fatherName: data.fatherName,
          helthInsurance: data.helthInsurance || 'Particular',
          adress: {
            city: data.city,
            complement: data.complement,
            neighborhood: data.neighborhood,
            number: data.number,
            street: data.street,
          },
          exams: [],
          medicament: [],
        });
          formRef.current.setErrors({});
          formRef.current.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = GetErros(err);
          formRef.current.setErrors(errors);
        }
      } 
    },
    [create],
  );
  return (
    <Container>
      <Title>Cadastro</Title>
      <FormContainer onSubmit={handleSubmit} ref={formRef}>
        <Input placeholder="Nome completo" name="name" type="text" />
        <Input placeholder="Nome da mãe" name="motherName" type="text" />
        <Input placeholder="Nome do pai" name="fatherName" type="text" />
        <Input placeholder="Data de Nascimento" name="birthday" type="date" />
        <Input placeholder="Convênio" name="helthInsurance" type="text" />
        <Input placeholder="Rua" name="street" type="text" />
        <Input placeholder="Número" name="number" type="number" />
        <Input placeholder="Bairro" name="neighborhood" type="text" />
        <Input placeholder="Complemento" name="complement" type="text" />
        <Input placeholder="Cidade" name="city" type="text" />
        <Submit type="submit">Cadastrar</Submit>
      </FormContainer>
    </Container>
  );
};

export default Register;
