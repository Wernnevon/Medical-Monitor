import styled from "styled-components";

export const AtestadoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #ffffffeb;
  box-sizing: border-box;

  > div:first-child {
    margin-top: 1.5rem;
  }
`;

export const GridPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  gap: 1rem;
  padding: 1rem;
`;

export const AtestadoCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.92);
  padding: 2rem 2rem 1.5rem;
  font-size: 30px;
  text-align: center;
  height: 98.3%;
  position: relative;
  border-radius: 4px;
  box-shadow: 0px 3px 13px 5px #00000021;

  @media print {
    display: none;
  }
`;

export const AtestadoCardOutput = styled.div`
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0px 3px 13px 5px #00000021;
  height: 98.3%;

  @media print {
    position: absolute;
    top: 0px;
    width: 190mm;
    max-height: 290mm;
    border-radius: 0;
    box-shadow: none;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    top: 3rem;
  }
`;

export const TitleForm = styled.div`
  width: 100%;
  text-align: center;
  font-family: "Akshar-Regular", sans-serif;
  /* font-weight: 400; */
  font-size: 1.5rem;
  color: #03a696;
  margin-bottom: 1rem;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #747474;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  color: #525252;
  transition: 100ms linear;
  margin: 0.8rem 0;
  :focus-within {
    color: #03a696;
    border-color: #03a696;
  }
`;

export const Label = styled.label`
  width: 100%;
  position: absolute;
  top: -0.3rem;
  margin-bottom: 0.2rem;
  text-align: left;
  transition: 50ms linear;
  font-family: "Akshar-Light", sans-serif;
  /* font-weight: 300; */
  font-size: 1.3rem;
  z-index: 0;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;
  padding: 1.2rem 0 0.2rem;
  background: none;
  margin: 0 0.2rem 0;
  font-size: 1.2rem;
  box-sizing: border-box;
  width: 100%;
  z-index: 5;
  font-family: "Akshar-Light", sans-serif;
  /* font-weight: 300; */
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
  }
`;

export const FormButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 2rem;
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
