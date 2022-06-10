import Styled from "styled-components";

export const ReceitaCard = Styled.div`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const Item = Styled.div`
  display: flex;
  align-items: center;
  width: 5rem;
  font-size: 1rem;
  position: absolute;
  right: 4rem;
`;

export const Label = Styled.label`
  min-width: max-content;
  font-size: 1rem;
  font-weight: 300;
  color: #333;
`;

export const Input = Styled.input`
  display: flex;
  align-items: center;
  margin-left: 5px;
  width: 25px;
  height: 1rem;
  font-size: 1rem;
  padding: 0 5px;
  outline: none;
  background: none;
  border: none;
  position: relative;
  z-index:30;
  text-align:right;
  font-size: .9rem;
  font-weight: 300;
  color: #333;
  ::-webkit-inner-spin-button{
    opacity:.5;
    cursor: pointer;
    margin-left: .3rem;
    margin-right: -.3rem;
  }
`;

export const ReceitaOutputCard = Styled.img`
  height: 300px;
  opacity: 0.3;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 15rem;
  text-align: center;
  z-index: 10;
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
  z-index: 20;
  height: 100%;
`;

export const Header = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Times New Roman", Times, serif;
`;

export const Logo = Styled.img`
  width: 100px;
  height: 65px;
  text-align: center;
  margin-top: 10px;
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
  align-items: start;
  flex-direction: column;
  margin: .8rem 0 1rem;
  width: 85%;
  height: 100%;
  z-index: 30;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;

export const ReceituarioOutput = Styled.label`
  display: flex;
  flex-direction: column;
  font-family: 'Akshar', sans-serif;
  font-weight: 300;
  font-size: 1.1rem;
  padding-bottom: 1.2rem;
  padding-left: .8rem;
  text-align: left;
  position: relative;
  box-sizing: border-box;
  word-wrap: break-word;
`;

export const ExamsList = Styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  overflow-y: auto;
  width: 100%;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const AtestadoOutputContainer = Styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0px;
  text-align: justify;
  height: calc(100vh - 350px);
`;

export const AtestadoOutput = Styled.label`
  background: none;
  line-height: 2rem;
  font-family: "Arial", sans-serif;
  font-size: 1rem;
  width: 100%;
`;

export const AtestadoDateOutput = Styled.label`
  background: none;
  line-height: 2rem;
  font-family: "Arial", sans-serif;
  font-size: 1rem;
  text-align: right;
`;

export const Footer = Styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  z-index: 30;
  position: relative;
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

export const ExamsContent = Styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const PatientLabel = Styled.label`
  font-family: 'Akshar', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 1rem;
`;

export const PatientDataContent = Styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
`;