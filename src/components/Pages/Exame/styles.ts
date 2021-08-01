import Styled from "styled-components";

export const ExameContainer = Styled.div`
  display: grid;
  grid-template-columns: 41vw 41vw;
  padding: 10px;
  align-items: center;
  width: 82.3vw;
  height: 97.8vh;
`;
export const ExameCard = Styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.92);
  border-radius: 20px;
  padding: 20px;
  font-size: 30px;
  margin: 0 20px;
  height: 70vh;
  position: relative;
  align-items: center;
  @media only screen and (max-height: 700px) {
    height: 90vh;
  }
`;

export const ExameContent = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

export const LabelHeader = Styled.label`
  margin-top: 5px;
  font-size: 1.5rem;
  text-align: center;
`;

export const InputData = Styled.input`
  outline:none;
  border: none;
  background: none;
  border-bottom: 1px solid #242424;
  width: 100%;
  padding: 1px 5px;
  font-size: 1.2rem;
  margin: 10px 10px 0 ;
`;

export const CheckoutContent = Styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ExamesContent = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify: flex-start;
  width: 100%;
  margin-top: 1.2rem;
  padding: 1rem 0;
  overflow: auto;
`;