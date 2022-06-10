import Styles, { keyframes } from "styled-components";
import { AlertBg, AlertFontColor, AlertTypes } from "../../Utils/ToastConfigs";

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

export const ToastWrapper = Styles.div`
    position: absolute;
    bottom: 1rem;
    left: 1rem;
`;

export const Toast = Styles.div`
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    animation: ${shake} 850ms cubic-bezier(.36,.07,.19,.97) both;
    color: ${({ toastType }: ToastProps) =>
      toastType === AlertTypes.WARNING
        ? AlertFontColor.WARNING
        : toastType === AlertTypes.ERROR
        ? AlertFontColor.ERROR
        : AlertFontColor.SUCESS};
    background-color: ${({ toastType }: ToastProps) =>
      toastType === AlertTypes.WARNING
        ? AlertBg.WARNING
        : toastType === AlertTypes.ERROR
        ? AlertBg.ERROR
        : AlertBg.SUCESS};
`;
