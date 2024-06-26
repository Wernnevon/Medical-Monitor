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
  padding: 0.5rem 0.5rem;
  gap: 1rem;
  width: max-content;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

export const Item = styled.span`
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
  gap: 0.5rem;
  color: #555;

  :hover {
    background-color: #ddd;
    cursor: pointer;
    color: #000;
  }
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
