import styled from "styled-components";

export const ReceitaCard = styled.div`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  width: 5rem;
  font-size: 1rem;
  position: absolute;
  right: 4rem;
  @media print {
    display: none;
  }
`;

export const Label = styled.label`
  min-width: max-content;
  font-size: 1rem;
  font-weight: 300;
  color: #333;
`;

export const Input = styled.input`
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
  z-index: 30;
  text-align: right;
  font-size: 0.9rem;
  font-weight: 300;
  color: #333;
  ::-webkit-inner-spin-button {
    opacity: 0.5;
    cursor: pointer;
    margin-left: 0.3rem;
    margin-right: -0.3rem;
  }
`;

export const ReceitaOutputCard = styled.img`
  height: 300px;
  opacity: 0.3;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: calc(50% - 150px);
  text-align: center;
  z-index: 10;
  background: none;
`;

export const Content = styled.div`
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

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Times New Roman", Times, serif;
`;

export const Logo = styled.img`
  width: 100px;
  height: 65px;
  text-align: center;
  margin-top: 10px;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    width: 70px;
    height: 45px;
  }
`;

export const LabelHeader = styled.label`
  margin-top: 5px;
  font-size: 1.5rem;
  text-align: center;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1.1rem;
  }
`;

export const LabelHeaderContent = styled.label`
  margin-top: 5px;
  font-size: 1rem;
  text-align: center;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.85rem;
  }
`;

export const ReceituarioOutputContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  margin: 0.8rem 0 1rem;
  width: 85%;
  height: 100%;
  z-index: 30;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;

export const ReceituarioOutput = styled.label`
  display: flex;
  flex-direction: column;
  font-family: "Akshar-Light", sans-serif;
  /* font-weight: 300; */
  font-size: 1.1rem;
  padding-bottom: 1.2rem;
  padding-left: 0.8rem;
  text-align: left;
  position: relative;
  box-sizing: border-box;
  word-wrap: break-word;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
  }
`;

export const ExamsList = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  overflow-y: auto;
  width: 100%;
  margin: 0;
  padding: 0;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const AtestadoOutputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin: 0px;
  text-align: justify;
  height: calc(100vh - 350px);
  position: relative;
  top: 2rem;
`;

export const AtestadoOutput = styled.label`
  background: none;
  line-height: 2rem;
  font-family: "Arial", sans-serif;
  font-size: 1rem;
  width: 100%;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    line-height: 1.5rem;
    font-size: 0.7rem;
  }
`;

export const AtestadoDateOutput = styled.label`
  background: none;
  line-height: 2rem;
  font-family: "Arial", sans-serif;
  font-size: 1rem;
  text-align: right;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.7rem;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  z-index: 30;
  position: relative;
`;

export const FooterLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0px 0px 5px 0px;
  width: 90%;
  z-index: 30;
  border-bottom: 1px solid #000;
`;

export const FooterLabel = styled.label`
  background: none;
  padding: 5px;
  font-family: "Arial";
  font-size: 0.8rem;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.6rem;
  }
`;

export const ExamsContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const PatientLabel = styled.label`
  font-family: "Akshar-Light", sans-serif;
  font-size: 1rem;
  /* font-weight: 300; */
  margin-bottom: 1rem;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
  }
`;

export const PatientDataContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
`;
