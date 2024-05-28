import { createContext, useContext, useState } from "react";
import { Popup } from "../../Components/Popup";
import { IconBaseProps } from "react-icons";

type PopupProps = {
  data: PopupData;
  onConfirm(): void;
  onCancel?(): void;
};

type PopupData = {
  icon?: IconBaseProps;
  title: string;
  message: string;
};

type ContextProps = {
  show(props: PopupProps): void;
};

type SettingsProps = {
  visible: boolean;
  data: PopupData;
  confirmCallback(): void;
  cancelCalback?(): void;
};

const initialSettings: SettingsProps = {
  visible: false,
  data: { message: "", title: "" },
  confirmCallback: () => {},
};

const Context = createContext({} as ContextProps);

export const PopupProvider = ({ children }: any) => {
  const [settings, setSettings] = useState(initialSettings);

  function show({ data, onConfirm, onCancel }: PopupProps) {
    setSettings({
      visible: true,
      data,
      confirmCallback: onConfirm,
      cancelCalback: onCancel,
    });
  }

  function close() {
    setSettings((prev) => ({ ...prev, visible: false }));
  }

  function confirm() {
    close();
    settings.confirmCallback();
  }

  function cancel() {
    close();
    if (settings.cancelCalback) settings.cancelCalback();
  }

  return (
    <Context.Provider value={{ show }}>
      {children}
      <Popup
        data={settings.data}
        onConfirm={confirm}
        onCancel={cancel}
        isVisible={settings.visible}
      />
    </Context.Provider>
  );
};

export const usePopup = (): ContextProps => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
