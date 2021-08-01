import Styled from "styled-components";

export const ReceitaContainer = Styled.div`
  display: grid;
  grid-template-columns: 41vw 41vw;
  padding: 10px;
  align-items: center;
  width: 82.3vw;
  height: 97.8vh;
`;
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
  width: 85%;
  height: 85%;
  opacity: 0.3;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 10;
  margin-top: 50px;
  background: none;
`;

export const Content = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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

export const ReceituarioContainer = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Receituario = Styled.textarea`
  display: flex;
  justify-content: center;
  background: none;
  width: 80%;
  height: 80%;
  outline: none;
  border: 1px solid #329bbc;
  border-radius: 5px;
  padding: 20px;
  font-family: "Arial";
  font-size: 1rem;
  margin: 20px 0px; 
  line-height:30px;
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
  background: none;
  padding: 5px 10px;
  font-family: "Arial";
  font-size: 1rem;
  word-break: break-all;
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