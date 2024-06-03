import styled from "styled-components";

// Estilizações para o componente de toggle
export const ToggleContainer = styled.div`
  position: relative;
  width: 2rem;
  height: 1rem;
  background-color: #f1f1f1;
  border-radius: 15px;
  cursor: pointer;
`;

export const ToggleButton = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 0;
  left: ${({ isActive }) => (isActive ? "calc(100% - 1rem)" : "0")};
  width: 1rem;
  height: 1rem;
  background-color: ${({ isActive }) => (isActive ? "#007bff" : "#4d4d4d")};
  border-radius: 50%;
  transition: left 0.3s ease-in-out;
`;
