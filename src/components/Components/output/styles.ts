import Styled from "styled-components";

export const ReceitaCard = Styled.div`
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  padding: 20px;
  font-size: 30px;
  margin: 0 20px;
  height: 70vh;
  position: relative;
  @media only screen and (max-height: 700px) {
    height: 90vh;
  }
`;
export const ReceitaOutputCard = Styled.img`
  height: 200px;
  opacity: 0.3;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 13rem;
  text-align: center;
  z-index: 10;
  /* margin-top: 8rem; */
  background: none;
`;

export const Content = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 0;
  left: 0;
  opacity: 0.99;
  z-index: 0;
  z-index: 20;
  height: 103%;
`;

export const Header = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Times New Roman", Times, serif;
`;

export const Logo = Styled.img`
  width: 25%;
  height: 25%;
  text-align: center;
`;

export const LabelHeader = Styled.label`
  margin-top: 5px;
  font-size: 1.5rem;
  text-align: center;
`;

export const LabelHeaderContent = Styled.label`
  margin-top: 5px;
  font-size: 1rem;
  text-align: center;

`;

export const ReceituarioOutputContainer = Styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px 0px;
  width: 85%;
  z-index: 30;
`;

export const ReceituarioOutput = Styled.label`
display: flex;
flex-direction: column;
  background: none;
  padding: 0;
  font-family: "Arial";
  font-size: 1rem;
  word-break: break-all;
  line-height: 1.2rem;
`;
export const AtestadoOutputContainer = Styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  margin: 0px;
  text-align: justify;
  z-index: 30;
`;
export const AtestadoOutput = Styled.label`
  background: none;
  line-height: 2rem;
  font-family: "Arial";
  font-size: 1rem;
  width: 100%;
`;
export const AtestadoDateOutput = Styled.label`
  background: none;
  line-height: 2rem;
  font-family: "Arial";
  font-size: 1rem;
  text-align: right;
`;
export const Footer = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 20px 0px;
  width: 100%;
  z-index: 30;
  position: absolute;
  bottom: 20px;
`;

export const FooterLine = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0px 0px 5px 0px;
  width: 90%;
  z-index: 30;
  border-bottom: 1px solid #000;
`;

export const FooterLabel = Styled.label`
  background: none;
  padding: 5px;
  font-family: "Arial";
  font-size: .8rem;
`;