import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  gap: 1rem;
  border-radius: 5px;
  font-family: "Akshar-Regular";
  color: #333;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #777;

  > svg {
    :hover {
      cursor: pointer;
      color: #cf5431;
    }
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 50rem;
  padding: 1rem 0.5rem;
  gap: 0.5rem;

  > label {
    font-family: "Akshar-Light";
    font-size: 1.5rem;
  }

  textarea {
    outline: none;
    height: 100%;
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    padding: 5px;
    :focus-within {
      border-color: #03a696;
    }
  }
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
`;
