import React, { useEffect, useState } from "react";

import BGLogo from "../../../Assets/PNGs/MMnoBG.png";
import LogoSVG from "../../../Assets/PNGs/MMnoBG.png";

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
import PDFButton from "../PDFButton";

export type AtestadoData = {
  patientName: string;
  cid: string;
  days: string;
  date: string;
  city: string;
  state: string;
};

interface Params {
  prescription?: any;
  exames?: any;
  atestado?: AtestadoData;
  patientName?: string;
}

const Output: React.FC<Params> = ({
  prescription,
  exames,
  atestado,
  patientName,
}: Params) => {
  const [select, setSelect] = useState(exames);
  const [copies, setCopies] = useState(1);

  useEffect(() => {
    setSelect(exames);
  }, [exames]);

  return (
    <ReceitaCard>
      {/* <Item>
        <Label>Cópias:</Label>
        <Input
          min="1"
          max="2"
          type="number"
          value={copies}
          onChange={(e) => setCopies(parseInt(e.target.value))}
        />
      </Item> */}
      <PDFButton
        copies={copies}
        type={prescription ? "Receita" : exames ? "Exames" : "Atestado"}
      />
      <Content>
        <ReceitaOutputCard src={BGLogo} />
        {/* Dados ficticios */}
        <Header>
          <Logo src={LogoSVG} />
          <LabelHeader>DR. JOÃO SILVA</LabelHeader>
          <LabelHeaderContent style={{ letterSpacing: "3px" }}>
            MEDICINA GERAL
          </LabelHeaderContent>
          <LabelHeaderContent style={{ fontSize: ".6rem", fontWeight: "bold" }}>
            CRM/SP: 12345 | CRM/RJ: 67890
          </LabelHeaderContent>
          <LabelHeaderContent style={{ fontSize: ".7rem" }}>
            (11) 9 8765-4321 | (21) 9 1234-5678
          </LabelHeaderContent>
          <LabelHeaderContent style={{ fontSize: ".6rem", fontWeight: "bold" }}>
            Rua Fictícia, 123, Centro, Cidade Imaginária - SP
          </LabelHeaderContent>
        </Header>

        <ReceituarioOutputContainer>
          {prescription && (
            <ExamsContent>
              <PatientDataContent>
                <PatientLabel>
                  {patientName ? `Paciente: ${patientName}` : ""}
                </PatientLabel>
              </PatientDataContent>
              {prescription!.map((receita: any) => (
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
                <PatientLabel>
                  {patientName ? `Paciente: ${patientName}` : ""}
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
                    ATESTO para os devidos fins de DIREITO que o (a) Sr. (a){" "}
                    {atestado.patientName.toLocaleUpperCase()} foi atendido(a)
                    neste Noscômico, portador(a) da entidade Nosológica-CID{" "}
                    {atestado.cid} devendo permanecer afastado (a) de suas
                    atividades habituais pelo período de {atestado.days} dias
                  </AtestadoOutput>
                  <AtestadoDateOutput>
                    {atestado.city}-{atestado.state}, {atestado.date}
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
