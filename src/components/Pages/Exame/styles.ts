import Styled from "styled-components";

export const ExameContainer = Styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  width: 85vw;
  margin-left: -.7vw;
  height: 100%;
`;
export const ExameCard = Styled.div`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  margin: 0 10px;
  height: 100vh;
  overflow-y: auto;
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