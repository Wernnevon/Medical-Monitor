import React, {
  useCallback,
  useContext,
  useState,
  createContext,
  ReactNode,
} from "react";
import { Toast, ToastWrapper } from "./styles";
import { AlertTypes } from "../../Utils/ToastConfigs";
import { FiAlertTriangle } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
import { AiOutlineCheckCircle } from "react-icons/ai";

interface ToastProps {
  children: ReactNode;
}

const Icon = ({ type }: any) => {
  return type === AlertTypes.SUCESS ? (
    <AiOutlineCheckCircle color="#fff" size={35}/>
  ) : type === AlertTypes.ERROR ? (
    <VscError color="#fff" size={35} />
  ) : (
    <FiAlertTriangle color="#000" size={30} />
  );
};

const ToastContext = createContext({} as Function);

export default ToastContext;

export function ToastContextProvider({ children }: ToastProps) {
  const [toasts, setToasts] = useState<string[]>([]);
  const [toastType, setToastType] = useState<string>("");

  const addToast = useCallback(
    function (toast: string, type: string = AlertTypes.WARNING) {
      setToasts([...toasts, toast]);
      setTimeout(() => setToasts((toasts: any) => toasts.slice(1)), 3000);
      setToastType(type.toLocaleUpperCase());
    },
    [setToasts],
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastWrapper>
        {toasts.map((toast) => (
          <Toast toastType={toastType} key={toast}>
            <div>
              <Icon type={toastType} />
            </div>
            <span>{toast}</span>
          </Toast>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
}

export const useToastContext = () => useContext(ToastContext);
