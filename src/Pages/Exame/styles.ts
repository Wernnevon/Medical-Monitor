import styled from "styled-components";

export const ExameContainer = styled.main`
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

export const ExameOutputCard = styled.div`
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

export const ExameCard = styled.div`
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

export const InputData = styled.textarea`
  outline: none;
  border: none;
  background: none;
  border-bottom: 1px solid #242424;
  box-sizing: border-box;
  width: 100%;
  padding: 1px 5px;
  font-size: 1rem;
  font-family: "Akshar-Light", sans-serif;
  /* font-weight: 300; */
  min-height: 4rem;
  :focus {
    border-color: #03a696;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
  }
`;

export const CheckoutContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ExamesContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 800px;
  margin: 0;
  padding: 1rem 0;
  overflow-y: auto;
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
