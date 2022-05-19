import Styled from "styled-components";

export const AtestadoContainer = Styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  width: 85vw;
  margin-left: -.7vw;
  height: 100%;
`;
export const AtestadoCard = Styled.div`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  margin: 0 10px;
  height: 100vh;
`;

export const AtestadoCardOutput = Styled.div`
  background-color: rgba(255, 255, 255, 0.0);
  border-radius: 20px;
`;

export const FormContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
`;

export const Item = Styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  font-size: 1.5rem;
`;

export const Label = Styled.label`
  min-width: max-content;
  font-size: inherit;
`;

export const Input = Styled.input`
  display: flex;
  align-items: center;
  margin-left: 5px;
  width: 100%;
  height: 2rem;
  font-size: 1.2rem;
  padding: 0 5px;
  outline: none;
  background: none;
  border: none;
  border-bottom: 1px solid #4d4d4d;
`;