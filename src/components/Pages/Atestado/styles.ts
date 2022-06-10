import Styled from "styled-components";

export const AtestadoContainer = Styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  width: 85vw;
  margin-left: -.7vw;
  height: 100vh;
  box-sizing: border-box;
`;
export const AtestadoCard = Styled.div`
  background-color: rgba(255, 255, 255, 0.92);
  padding: 20px;
  font-size: 30px;
  text-align: center;
  margin: 0 10px;
  height: 100%;
`;

export const AtestadoCardOutput = Styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
`;

export const FormContainer = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
  position: relative;
`;

export const TitleForm = Styled.div`
  width: 100%;
  text-align: center;
  font-family: 'Akshar', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  color: #03A696;
  margin-bottom: 1rem;
`;

export const Item = Styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #747474;
  width:100%;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  color: #525252;
  transition: 100ms linear;
  margin: .8rem 0;
  :focus-within{
      color: #03A696;
      border-color: #03A696;
  };
`;

export const Label = Styled.label`
  width: 100%;
  position: absolute;
  top: -.3rem;
  margin-bottom: .2rem;
  text-align: left;
  transition: 50ms linear;
  font-family: 'Akshar', sans-serif;
  font-weight: 300;
  font-size: 1.3rem;
  z-index: 0;
`;

export const Input = Styled.input`
  border: none;
  outline: none;
  padding: 1.2rem 0 .2rem;
  background: none;
  margin: 0 .2rem 0;
  font-size: 1.2rem;
  box-sizing: border-box;
  width: 100%;
  z-index: 5;
  font-family: 'Akshar', sans-serif;
  font-weight: 300;
`;
