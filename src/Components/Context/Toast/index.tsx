import {
  useCallback,
  useContext,
  useState,
  createContext,
  ReactNode,
} from "react";
import {
  IconSection,
  LineBar,
  MessageContainer,
  TitleMessage,
  Toast,
  ToastMessage,
  ToastWrapper,
} from "./styles";
import { AlertTitle, AlertTypes } from "../../Utils/ToastConfigs";
import { FiAlertTriangle } from "react-icons/fi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { RiEmotionHappyLine } from "react-icons/ri";

interface ToastProps {
  children: ReactNode;
}
const { innerWidth: width } = window;

const Icon = {
  [AlertTypes.SUCESS]: (
    <RiEmotionHappyLine size={width < 1025 ? 20 : 80} color="#fff" />
  ),
  [AlertTypes.WARNING]: (
    <FiAlertTriangle size={width < 1025 ? 18 : 90} color="#fff" />
  ),
  [AlertTypes.ERROR]: (
    <HiOutlineEmojiSad size={width < 1025 ? 20 : 80} color="#fff" />
  ),
};

const ToastContext = createContext({} as Function);

export default ToastContext;

export function ToastContextProvider({ children }: ToastProps) {
  const [toasts, setToasts] = useState<string[]>([]);
  const [toastType, setToastType] = useState<AlertTypes>(AlertTypes.WARNING);

  const addToast = useCallback(
    (toast: string, type: AlertTypes) => {
      setToasts([...toasts, toast]);
      setTimeout(() => setToasts((toasts: string[]) => toasts.slice(1)), 2000);
      setToastType(type);
    },
    [toasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastWrapper>
        {toasts.map((toast) => (
          <Toast key={toast}>
            <IconSection toastType={toastType}>{Icon[toastType]}</IconSection>
            <MessageContainer>
              <TitleMessage toastType={toastType}>
                {AlertTitle[toastType]}
              </TitleMessage>
              <ToastMessage>{toast}</ToastMessage>
              <LineBar toastType={toastType} />
            </MessageContainer>
          </Toast>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
}

export const useToastContext = () => useContext(ToastContext);
