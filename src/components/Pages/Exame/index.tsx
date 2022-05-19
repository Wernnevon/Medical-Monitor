import React from "react";
import Output from "../../Components/output";
import Dropdown from "../../Components/Dropdown";
import { useExame } from "../../Components/Context/ExameContext";

import {
  ExameCard,
  ExameContainer,
  ExameContent,
  LabelHeader,
  InputData,
  CheckoutContent,
  ExamesContent,
} from "./styles";

const Exame: React.FC = () => {
  const { exames, selected } = useExame();

  return (
    <ExameContainer>
      <ExameCard>
        <LabelHeader>Selecione os exames:</LabelHeader>
        <ExameContent>
          <CheckoutContent>
            <LabelHeader>Paciente:</LabelHeader>
            <InputData />
          </CheckoutContent>
          <CheckoutContent>
            <LabelHeader>Idade:</LabelHeader>
            <InputData />
          </CheckoutContent>
          <CheckoutContent>
            <LabelHeader>Convênio:</LabelHeader>
            <InputData />
          </CheckoutContent>
          <CheckoutContent>
            <LabelHeader>Data:</LabelHeader>
            <InputData style={{ width: "max-content" }} type="date" />
          </CheckoutContent>
        </ExameContent>
        <ExamesContent>
          {exames.map((exame) => (
            <Dropdown
              key={exame.type}
              type={exame.type}
              exames={exame.exames}
            />
          ))}
          <CheckoutContent
            style={{
              flexDirection: "column",
              alignItems: "start",
              width: "95%",
              margin: "10px 0px 20px 0px",
            }}
          >
            <LabelHeader>Outros Exames:</LabelHeader>
            <InputData
              as="textarea"
              style={{
                width: "98%",
                minHeight: "60px",
                margin: 0,
                fontSize: "1rem",
                marginTop: "10px",
              }}
            />
          </CheckoutContent>
        </ExamesContent>
      </ExameCard>
      <Output exames={selected} />
    </ExameContainer>
  );
};

export default Exame;
