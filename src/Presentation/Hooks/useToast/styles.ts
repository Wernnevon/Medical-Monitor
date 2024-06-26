import styled, { keyframes } from "styled-components";
import { ToastColorStartegy, ToastTypes } from "./ToastConfigs";

interface ToastProps {
  toastType: ToastTypes;
}

const shake = keyframes`
   10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const ToastWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 99;
`;

export const Toast = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  animation: ${shake} 850ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  color: #333;
  background-color: #f9f9f9;
  font-size: 1.2rem;
  gap: 1rem;
  width: 20rem;
  /* font-weight: 300; */
  font-family: "Akshar-Light", sans-serif;
  border: 1px solid
    ${({ toastType }: ToastProps) => ToastColorStartegy[toastType]};
  padding: 1rem;
  box-shadow: 0px 3px 13px 5px #00000021;
  border-radius: 5px;

  svg {
    min-height: 40px;
    min-width: 40px;
  }
  @media (max-width: 1200px),
    (max-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
  }
`;
