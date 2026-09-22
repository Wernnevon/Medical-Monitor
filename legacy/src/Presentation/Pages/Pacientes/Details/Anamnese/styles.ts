import styled from "styled-components";
import Button from "../../../../Components/Buttons";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Title = styled.label`
  font-family: "Akshar-Light";
  font-size: 1.8rem;
`;

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;
`;

export const AnamneseInput = styled.textarea`
  outline: none;
  height: 100%;
  width: 100%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  :focus-within {
    border-color: #03a696;
  }
`;

export const SubmitAnamnese = styled(Button)``;
