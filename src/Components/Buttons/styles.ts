import styled from "styled-components";

interface PropsButton {
  typeButton: string;
}
const bgColors = {
  submit: "#03A696",
  back: "#FFF",
};

const fontColors = {
  submit: "#FFF",
  back: "#000",
};

export const Container = styled.button<PropsButton>`
  display: flex;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: ${({ typeButton }: PropsButton) =>
    bgColors[typeButton as keyof typeof bgColors]};
  color: ${({ typeButton }: PropsButton) =>
    fontColors[typeButton as keyof typeof fontColors]};
  padding: 0.4rem 2rem;
  margin: 0 5rem;
  font-size: 1.2rem;
  font-weight: 400;
  transition: 40ms ease-in;
  box-shadow: 0px 3px 8px 0px #00000033;
  font-family: "Akshar", sans-serif;
  max-width: max-content;
  position: absolute;
  bottom: -5em;
  align-self: ${({ typeButton }: PropsButton) =>
    typeButton === "submit" ? "flex-end" : "flex-start"};
  :hover {
    cursor: pointer;
  }
  :active {
    transform: translateY(2px);
  }
`;
