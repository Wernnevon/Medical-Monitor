import styled from "styled-components";

export const AtestadoContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  width: 85vw;
  margin-left: -0.7vw;
  height: 100vh;
  box-sizing: border-box;
`;
export const AtestadoCard = styled.div`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  margin: 0 10px;
  height: 100%;
  @media print {
    display: none;
  }
`;

export const AtestadoCardOutput = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  @media print {
    position: absolute;
    top: 0px;
    width: 190mm;
    max-height: 290mm;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
  position: relative;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
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
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
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
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
  }
`;
