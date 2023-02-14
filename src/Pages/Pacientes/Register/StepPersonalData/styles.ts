import { Form } from "@unform/web";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
`;
export const FormContent = styled.div`
  display: grid;
  grid-template-columns: 40% 40%;
  width: 100%;
  gap: 3rem 1rem;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    gap: 1rem 1rem;
  }
`;

export const Title = styled.label`
  font-family: "Akshar-SemiBold", sans-serif;
  /* font-weight: 600; */
  color: #03a696;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.5em;
  text-transform: uppercase;
  width: 82%;
  border: none;
  align-self: center;
`;
