import { createContext, useContext, useState } from "react";
import { Diagnosis } from "../../Components/Diagnosis";

type ModalDiagnosisProps = {
  diagnosisId: number;
  onConfirm(): void;
  onCancel?(): void;
};
type ContextProps = {
  showDiagnosis(props: ModalDiagnosisProps): void;
};

type SettingsProps = {
  visible: boolean;
  diagnosisId: number;
  confirmCallback(): void;
  cancelCalback?(): void;
};

const initialSettings: SettingsProps = {
  visible: false,
  diagnosisId: 0,
  confirmCallback: () => {},
};

const Context = createContext({} as ContextProps);

export const ModalDiagnosisProvider = ({ children }: any) => {
  const [settings, setSettings] = useState(initialSettings);

  function showDiagnosis({
    diagnosisId,
    onConfirm,
    onCancel,
  }: ModalDiagnosisProps) {
    setSettings({
      visible: true,
      diagnosisId,
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
    <Context.Provider value={{ showDiagnosis }}>
      {children}
      <Diagnosis
        diagnosisId={settings.diagnosisId}
        onConfirm={confirm}
        onCancel={cancel}
        isVisible={settings.visible}
      />
    </Context.Provider>
  );
};

export const useModalDiagnosis = (): ContextProps => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useModalDiagnosis must be used within a PopupProvider");
  }
  return context;
};
