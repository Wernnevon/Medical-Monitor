import React, { useEffect, useState } from "react";

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
} from "./styles";
import PDFButton from "../Utils/PDFButton";

interface Params {
  content?: any;
  exames?: any;
  atestado?: any;
}

const Output: React.FC<Params> = ({ content, exames, atestado }: Params) => {
  const [select, setSelect] = useState(exames);
  var i = 0;

  useEffect(() => {
    setSelect(exames);
  }, [exames]);

  return (
    <ReceitaCard>
      <Content id="divToPrint">
      <ReceitaOutputCard src={BGLogo} />
        <Header>
          <Logo src={LogoSVG} />
          <LabelHeader>DR. BERTRANDY ANACLETO</LabelHeader>
          <LabelHeaderContent style={{ letterSpacing: "3px" }}>
            {" "}
            MEDICINA GERIÁTRICA{" "}
          </LabelHeaderContent>
          <LabelHeaderContent style={{ fontSize: ".8rem", fontWeight: "bold" }}>
            {" "}
            CRM/PB: 9647 | CRM/RN: 8103{" "}
          </LabelHeaderContent>
          <LabelHeaderContent style={{ fontSize: ".9rem" }}>
            {" "}
            (83) 9 9929-2209 | (83) 9 9844-1379{" "}
          </LabelHeaderContent>
          <LabelHeaderContent style={{ fontSize: ".8rem", fontWeight: "bold" }}>
            {" "}
            Rua Lourival Ribeiro da Nóbrega, 11, Centro, São João do Rio do
            Peixe - PB{" "}
          </LabelHeaderContent>
        </Header>
        <ReceituarioOutputContainer>
          {content && (
            <div>
              {content!.map((receita: any) => (
                <ReceituarioOutput key={i++}> {receita} </ReceituarioOutput>
              ))}
            </div>
          )}
          {select && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                overflowY: "auto",
                height: "300px",
              }}
            >
              {select!.map((exame: any) => (
                <ReceituarioOutput key={exame}>
                  {" "}
                  {exame} <br />{" "}
                </ReceituarioOutput>
              ))}
            </div>
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
      <PDFButton/>
    </ReceitaCard>
  );
};

export default Output;

{/* <button onClick={handleGenPDF}>print</button> */}