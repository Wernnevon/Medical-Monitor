import React, { useState } from "react";

import Output, { AtestadoData } from "../../Components/output";

import {
  AtestadoCard,
  AtestadoContainer,
  AtestadoCardOutput,
  FormContainer,
  Input,
  Item,
  Label,
  TitleForm,
  GridPanel,
  FormButtonClear,
  FormButtonContainer,
} from "./styles";
import { Breadcrumb } from "../../Components/Breadcrumb";
import { formmatDate } from "../../Utils/dateUtils";

const dafaultData: AtestadoData = {
  patientName: "__________________",
  cid: "__________________",
  days: "1",
  date: new Date().toLocaleDateString(),
  city: "Cidade",
  state: "UF",
};

const initialValue: AtestadoData = {
  patientName: "",
  cid: "",
  days: "1",
  date: new Date().toISOString().substring(0, 10),
  city: "",
  state: "",
};

const Atestado: React.FC = () => {
  const [attestForm, setAttestForm] = useState<AtestadoData>(initialValue);

  const breadcrumbItems = [{ label: "Atestado", path: "" }];

  function handleChange({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setAttestForm((prev) => {
      if (name === "date") {
        return {
          ...prev,
          [name]: formmatDate(value as unknown as Date),
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function handleClear() {
    setAttestForm(initialValue);
  }

  function isValidForm() {
    const { patientName, cid, city, state } = attestForm;
    return patientName || cid || city || state;
  }

  return (
    <AtestadoContainer>
      <Breadcrumb items={breadcrumbItems} />
      <GridPanel>
        <AtestadoCard>
          <FormContainer>
            <TitleForm>Dados do Paciente</TitleForm>
            <Item>
              <Label>Paciente:</Label>
              <Input
                name="patientName"
                onChange={handleChange}
                value={attestForm.patientName}
              />
            </Item>
            <Item>
              <Label>Entidade Nosocológica-CID:</Label>
              <Input
                name="cid"
                onChange={handleChange}
                value={attestForm.cid}
              />
            </Item>
            <Item>
              <Label>Dias:</Label>
              <Input
                name="days"
                value={attestForm.days}
                onChange={handleChange}
                type="number"
                min="01"
              />
            </Item>
            <Item>
              <Label>Data:</Label>
              <Input
                name="date"
                defaultValue={attestForm.date}
                onChange={handleChange}
                type="date"
              />
            </Item>
            <Item>
              <Label>Cidade:</Label>
              <Input
                name="city"
                onChange={handleChange}
                type="text"
                value={attestForm.city}
              />
            </Item>
            <Item>
              <Label>UF:</Label>
              <Input
                name="state"
                onChange={handleChange}
                type="text"
                value={attestForm.state}
              />
            </Item>
          </FormContainer>
          <FormButtonContainer>
            <FormButtonClear onClick={handleClear}>Limpar</FormButtonClear>
            {/* <FormButtonSave>Salvar</FormButtonSave> */}
          </FormButtonContainer>
        </AtestadoCard>
        <AtestadoCardOutput>
          <Output atestado={isValidForm() ? attestForm : dafaultData} />
        </AtestadoCardOutput>
      </GridPanel>
    </AtestadoContainer>
  );
};

export default Atestado;
