import { GoKebabHorizontal } from "react-icons/go";
import styled from "styled-components";

export const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 1rem;
  right: 4rem;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
  background-color: #fff;
  padding: .5rem 1rem;
  gap: 1rem;
  width: max-content;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;

`;

export const Kebab = styled(GoKebabHorizontal)`
  color: #00786d;
  margin-bottom: -5px;
  :hover {
    cursor: pointer;
    color: #03a696;
    background-color: #e1e1e1;
    border-radius: 50%;
  }
`;
