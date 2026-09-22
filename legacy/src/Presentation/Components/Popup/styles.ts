import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border-radius: 5px;
  max-width: 500px;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
  background-color: #e6e6e6;
  border-radius: 5px 5px 0 0;

  span {
    font-size: 1.5rem;
    margin-bottom: -2px;
  }
  label {
    font-size: 1.4rem;
    font-family: "Akshar-Regular";
  }

  > svg {
    margin-left: auto;
    margin-right: 0;
    :hover {
      cursor: pointer;
      color: #cf5431;
    }
  }
`;

export const Main = styled.main`
  display: flex;
  align-items: center;
  padding: 1rem;
  font-family: Arial, sans-serif;
`;

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 1rem;

  button {
    font-size: 1rem;

    box-shadow: none;
    :first-child {
      border: 1px solid #4d4d4d;
    }
  }
`;
