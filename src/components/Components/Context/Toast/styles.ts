import Styled, { keyframes } from "styled-components";
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

export const ToastWrapper = Styled.div`
    position: absolute;
    bottom: 1rem;
    left: 2rem;
`;

export const Toast = Styled.div`
    display: flex;
    border-radius: 2px;
    margin-bottom: 0.5rem;
    animation: ${shake} 850ms cubic-bezier(.36,.07,.19,.97) both;
    color: #333;
    background-color: #EFEFEF;
    font-size: 1.2rem;
    font-weight: 300;
    font-family: 'Akshar', sans-serif;
    border: .3rem solid;
    border-color: ${({ toastType }: ToastProps) =>
      toastType === AlertTypes.WARNING
        ? AlertBg.WARNING
        : toastType === AlertTypes.ERROR
        ? AlertBg.ERROR
        : AlertBg.SUCESS};
    div{
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
    span{
      padding: .2rem 5rem;
    }
`;