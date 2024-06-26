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
import { v4 as uuidv4 } from "uuid";

type ToastProps = {
  children: ReactNode;
};

type ToastMessage = {
  id: string;
  message: string;
  type: ToastTypes;
};

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

const ToastContext = createContext(
  {} as (toast: string, type?: ToastTypes) => void
);

export default ToastContext;

export function ToastContextProvider({ children }: ToastProps) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastTypes = ToastTypes.WARNING) => {
      const id = uuidv4();
      setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, 2000);
    },
    []
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastWrapper>
        {toasts.map(({ id, message, type }) => (
          <Toast toastType={type} key={id}>
            {IconStartegy[type]}
            <span>{message}</span>
          </Toast>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
