import {
  useCallback,
  useContext,
  useState,
  createContext,
  ReactNode,
} from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
import { AiOutlineCheckCircle } from "react-icons/ai";

import { Toast, ToastWrapper } from "./styles";
import { ToastColorStartegy, ToastTypes } from "./ToastConfigs";

interface ToastProps {
  children: ReactNode;
}

export const IconStartegy = {
  [ToastTypes.ERROR]: (
    <VscError size={32} color={ToastColorStartegy[ToastTypes.ERROR]} />
  ),
  [ToastTypes.SUCESS]: (
    <AiOutlineCheckCircle
      size={32}
      color={ToastColorStartegy[ToastTypes.SUCESS]}
    />
  ),
  [ToastTypes.WARNING]: (
    <FiAlertTriangle size={30} color={ToastColorStartegy[ToastTypes.WARNING]} />
  ),
};

const ToastContext = createContext({} as Function);

export default ToastContext;

export function ToastContextProvider({ children }: ToastProps) {
  const [toasts, setToasts] = useState<string[]>([]);
  const [toastType, setToastType] = useState<ToastTypes>(ToastTypes.WARNING);

  const addToast = useCallback(
    function (toast: string, type: ToastTypes = ToastTypes.WARNING) {
      setToasts([...toasts, toast]);
      setTimeout(() => setToasts((toasts: any) => toasts.slice(1)), 2000);
      setToastType(type);
    },
    [toasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastWrapper>
        {toasts.map((toast) => (
          <Toast toastType={toastType} key={toast}>
            {IconStartegy[toastType]}
            <span>{toast}</span>
          </Toast>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
