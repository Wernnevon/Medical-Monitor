import {
  useCallback,
  useContext,
  useState,
  createContext,
  ReactNode,
} from "react";
import { Toast, ToastWrapper } from "./styles";
import { FiAlertTriangle } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AlertTypes } from "./ToastConfigs";

interface ToastProps {
  children: ReactNode;
}
const { innerWidth: width } = window;

const Icon = ({ type }: any) => {
  return type === AlertTypes.SUCESS ? (
    <AiOutlineCheckCircle size={width < 1025 ? 20 : 32} color="#fff" />
  ) : type === AlertTypes.ERROR ? (
    <VscError size={width < 1025 ? 20 : 32} color="#fff" />
  ) : (
    <FiAlertTriangle size={width < 1025 ? 18 : 30} color="#000" />
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
      setTimeout(() => setToasts((toasts: any) => toasts.slice(1)), 2000);
      setToastType(type.toLocaleUpperCase());
    },
    [toasts]
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

export const useToast = () => useContext(ToastContext);
