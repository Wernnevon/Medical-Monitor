import React, { useEffect, useRef, useState } from "react";

import BGLogo from "../../../assests/logo02SVG.svg";
import LogoSVG from "../../../assests/logo02SVG.svg";

import {
  ReceitaCard,
  ReceitaOutputCard,
  Content,
  Header,
  Logo,
  LabelHeader,
  LabelHeaderContent,
  ReceituarioOutput,
  ReceituarioOutputContainer,
  AtestadoOutputContainer,
  AtestadoOutput,
  Footer,
  FooterLine,
  FooterLabel,
  AtestadoDateOutput,
  Input,
  Item,
  Label,
  ExamsList,
  ExamsContent,
  PatientLabel,
  PatientDataContent,
} from "./styles";
import PDFButton from "../Utils/PDFButton";
import getAge from "../Utils/getAge";

interface PatientData {
  name: string;
  birthday: Date;
  healthInsurance: string;
}

interface Params {
  content?: any;
  exames?: any;
  atestado?: any;
  patientData?: PatientData;
}

const Output: React.FC<Params> = ({
  content,
  exames,
  atestado,
  patientData,
}: Params) => {
  const [select, setSelect] = useState(exames);
  const [copies, setCopies] = useState(1);

  useEffect(() => {
    setSelect(exames);
  }, [exames]);

  return (
    <ReceitaCard>
      <Item>
        <Label>Cópias:</Label>
        <Input
          min="1"
          max="2"
          type="number"
          value={copies}
          onChange={(e) => setCopies(parseInt(e.target.value))}
        />
      </Item>
      <PDFButton
        copies={copies}
        type={content ? "Receita" : exames ? "Exames" : "Atestado"}
      />
      <Content id="divToPrint">
        <ReceitaOutputCard src={BGLogo} />
        <Header>
          <Logo src={LogoSVG} />
          <LabelHeader>DR. BERTRANDY ANACLETO</LabelHeader>
          <LabelHeaderContent style={{ letterSpacing: "3px" }}>
            MEDICINA GERIÁTRICA
          </LabelHeaderContent>
          <LabelHeaderContent style={{ fontSize: ".8rem", fontWeight: "bold" }}>
            CRM/PB: 9647 | CRM/RN: 8103
          </LabelHeaderContent>
          <LabelHeaderContent style={{ fontSize: ".9rem" }}>
            (83) 9 9929-2209 | (83) 9 9844-1379
          </LabelHeaderContent>
          <LabelHeaderContent style={{ fontSize: ".8rem", fontWeight: "bold" }}>
            Rua Lourival Ribeiro da Nóbrega, 11, Centro, São João do Rio do
            Peixe - PB
          </LabelHeaderContent>
        </Header>
        <ReceituarioOutputContainer>
          {content && (
            <ExamsContent>
              <PatientDataContent>
                <PatientLabel>Nome: {patientData?.name}</PatientLabel>
                <PatientLabel>
                  Idade:{" "}
                  {patientData?.birthday
                    ? getAge(patientData?.birthday) + " anos"
                    : ""}
                </PatientLabel>
                <PatientLabel>
                  Convênio: {patientData?.healthInsurance}
                </PatientLabel>
              </PatientDataContent>
              {content!.map((receita: any) => (
                <ReceituarioOutput key={receita}>
                  {" "}
                  ● {receita}{" "}
                </ReceituarioOutput>
              ))}
            </ExamsContent>
          )}
          {select && (
            <ExamsContent>
              <PatientDataContent>
                <PatientLabel>Nome: {patientData?.name}</PatientLabel>
                <PatientLabel>
                  Idade:{" "}
                  {patientData?.birthday
                    ? getAge(patientData?.birthday) + " anos"
                    : ""}
                </PatientLabel>
                <PatientLabel>
                  Convênio: {patientData?.healthInsurance}
                </PatientLabel>
              </PatientDataContent>
              <ExamsList>
                {select!.map((exame: any) => (
                  <ReceituarioOutput key={exame}>● {exame}</ReceituarioOutput>
                ))}
              </ExamsList>
            </ExamsContent>
          )}
          {atestado && (
            <div>
              {
                <AtestadoOutputContainer>
                  <AtestadoOutput>
                    ATESTO para os devidos fins de DIREITO que o (a){" "}
                    {atestado.paciente} foi atendido(a) neste Noscômico,
                    portador(a) da entidade Nosológica-CID {atestado.cid}{" "}
                    devendo permanecer afastado (a) de suas atividades habituais
                    pelo período de {atestado.dia} dias
                  </AtestadoOutput>
                  <AtestadoDateOutput>
                    {atestado.location},{" "}
                    {atestado.date.toLocaleDateString("pt-BR")}
                  </AtestadoDateOutput>
                </AtestadoOutputContainer>
              }
            </div>
          )}
        </ReceituarioOutputContainer>
        <Footer style={{ marginTop: "20px" }}>
          <FooterLine />
          <FooterLabel>Assinatura</FooterLabel>
        </Footer>
      </Content>
    </ReceitaCard>
  );
};

export default Output;
