import { createContext, useContext, useState } from "react";
import { makeDiagnosisModalComponent } from "../../../Main/Factories/Components";

type ModalDiagnosisProps = {
  diagnosisId: number;
};
type ContextProps = {
  showDiagnosis(props: ModalDiagnosisProps): void;
};

type SettingsProps = {
  visible: boolean;
  diagnosisId: number;
};

const initialSettings: SettingsProps = {
  visible: false,
  diagnosisId: 0,
};

const Context = createContext({} as ContextProps);

export const ModalDiagnosisProvider = ({ children }: any) => {
  const [settings, setSettings] = useState(initialSettings);

  function showDiagnosis({ diagnosisId }: ModalDiagnosisProps) {
    setSettings({
      visible: true,
      diagnosisId,
    });
  }

  function close() {
    setSettings((prev) => ({ ...prev, visible: false }));
  }

  return (
    <Context.Provider value={{ showDiagnosis }}>
      {children}{" "}
      {makeDiagnosisModalComponent({
        isVisible: settings.visible,
        diagnosisId: settings.diagnosisId,
        close,
      })}
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
