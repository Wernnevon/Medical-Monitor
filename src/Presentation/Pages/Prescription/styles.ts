import styled from "styled-components";

export const ReceitaContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  width: 85vw;
  margin-left: -0.027vw;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  gap: 1rem;
`;

export const PrescriptionOutputCard = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  height: 100%;
  @media print {
    position: absolute;
    top: 0px;
    width: 190mm;
    max-height: 290mm;
  }
`;

export const ReceitaCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.92);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  height: 100%;
  position: relative;
  @media print {
    display: none;
  }
`;

export const LabelHeader = styled.label`
  margin-top: 5px;
  font-size: 1.3rem;
  /* font-weight: 300; */
  font-family: "Akshar-Light", sans-serif;
  text-align: center;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1.2rem;
  }
`;

export const ReceituarioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Receituario = styled.textarea`
  display: flex;
  justify-content: center;
  background: none;
  width: 90%;
  height: 37.7%;
  outline: none;
  border: 1px solid #329bbc;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0.2rem 0.5rem;
  font-family: "Akshar-Light", sans-serif;
  /* font-weight: 300; */
  font-size: 1rem;
  margin: 20px 0px;
  line-height: 30px;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
  }
`;

export const FormButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  box-sizing: border-box;
`;

export const FormButtonSave = styled.button`
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #03a696;
  color: #fff;
  padding: 0.4rem 2rem;
  margin: 0 1rem;
  font-size: 1rem;
  /* font-weight: 400; */
  transition: 40ms ease-in;
  box-shadow: 0px 3px 8px 0px #00000033;
  font-family: "Akshar-Regular", sans-serif;

  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
    padding: 0.2rem 1.5rem;
    height: 28px;
    margin: 0 0.5rem;
  }
`;

export const FormButtonClear = styled.button`
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #fff;
  color: #000;
  padding: 0.4rem 2rem;
  margin: 0 1rem;
  font-size: 1rem;
  /* font-weight: 400; */
  transition: 40ms ease-in;
  box-shadow: 0px 3px 8px 0px #00000033;
  font-family: "Akshar-Regular", sans-serif;
  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
    padding: 0.2rem 1.5rem;
    height: 28px;
    margin: 0 0.5rem;
  }
`;
