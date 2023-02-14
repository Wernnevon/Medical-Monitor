import styled, { keyframes } from "styled-components";
import { AlertBg, AlertTypes } from "../../Utils/ToastConfigs";

interface ToastProps {
  toastType: string;
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
  bottom: 1rem;
  left: 2rem;
  z-index: 99;
`;

export const Toast = styled.div`
  display: flex;
  border-radius: 2px;
  margin-bottom: 0.5rem;
  animation: ${shake} 850ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  color: #333;
  background-color: #efefef;
  font-size: 1.2rem;
  /* font-weight: 300; */
  font-family: "Akshar-Light", sans-serif;
  border: 0.3rem solid;
  border-color: ${({ toastType }: ToastProps) =>
    toastType === AlertTypes.WARNING
      ? AlertBg.WARNING
      : toastType === AlertTypes.ERROR
      ? AlertBg.ERROR
      : AlertBg.SUCESS};
  div {
    display: flex;
    padding: 0rem 1.5rem;
    margin: -0.1rem;
    justify-content: center;
    align-items: center;
    background: ${({ toastType }: ToastProps) =>
      toastType === AlertTypes.WARNING
        ? AlertBg.WARNING
        : toastType === AlertTypes.ERROR
        ? AlertBg.ERROR
        : AlertBg.SUCESS};
  }
  span {
    padding: 0.2rem 5rem;
  }
  @media (min-width: 1200px),
    (min-width: 960px) and (-webkit-device-pixel-ratio: 1.25) {
    font-size: 0.8rem;
    span {
      padding: 0 2rem;
    }
  }
`;
