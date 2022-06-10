import React, { useCallback, useContext, useState, createContext, ReactNode } from "react";
import {Toast, ToastWrapper} from "./styles";
import { AlertTypes } from "../../Utils/ToastConfigs";

interface ToastProps{
    children: ReactNode;
}

const ToastContext = createContext({} as Function) ;

export default ToastContext;

export function ToastContextProvider({ children }:ToastProps) {
  const [toasts, setToasts] = useState<string[]>([]);
  const [toastType, setToastType] = useState<string>('')

  const addToast = useCallback(
    function (toast:string, type: string = AlertTypes.WARNING) {
      setToasts([...toasts, toast]);
      setTimeout(() => setToasts((toasts:any) => toasts.slice(1)), 3000);
      setToastType(type.toLocaleUpperCase());
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <ToastWrapper>
        {toasts.map((toast) => (
          <Toast toastType={toastType} key={toast}>
            {toast}
          </Toast>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
}

export const useToastContext = () => useContext(ToastContext);