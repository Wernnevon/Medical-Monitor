import { Form } from "@unform/web";
import styled from "styled-components";

interface CardProps {
  color: string;
}

export const RegisterCard = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 3px 13px 5px #00000021;
  margin: 2rem;
  padding: 2rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid #747474;

  label {
    font-family: "Akshar-Regular";
  }
`;

export const StepProgressContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 1em 0;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    margin: 0;
  }
`;

export const StepProgressCard = styled.div<CardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  width: 100%;
  margin: 2rem 0;
  position: relative;
  user-select: none;
  cursor: default;
  img {
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 5;
  }
  label {
    font-size: 1.5vw;
    font-family: "Akshar-SemiBold", sans-serif;
    color: ${({ color }: CardProps) => color};
    z-index: 10;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 0 1rem;
  margin-top: 3rem;
`;

export const FormContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 4rem 2rem;
  box-sizing: border-box;
  text-align: justify;
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    gap: 1rem 1rem;
  }
`;

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Submit = styled.button`
  width: 20em;
  position: relative;
  border: none;
  border-radius: 5em;
  outline: none;
  background-color: #03a696;
  height: 2.5rem;
  color: #fff;
  font-size: 1.3rem;
  /* font-weight: 500; */
  transition: 40ms ease-in;
  margin: 1.5em 0 4em;
  font-family: "Akshar-Medium", sans-serif;
  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 1rem;
  }
`;
