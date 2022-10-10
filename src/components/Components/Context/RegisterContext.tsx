import React, { createContext, ReactNode, useContext, useState } from "react";
import Patient from "../../../Infra/DAOarchive/model";

interface RegisterProps {
  children: ReactNode;
}

interface RegisterContextData {
  patient: Patient;
  step: number;
  changeStep: (step: number) => void;
  addData: (patient: Patient) => void;
  clearData: () => void;
}

const RegisterContext = createContext({} as RegisterContextData);

export function RegisterProvider({ children }: RegisterProps) {
  const [patient, setPatient] = useState<Patient>({} as Patient);
  const [step, setStep] = useState<number>(1);

  function changeStep(newStep: number) {
    setStep(newStep);
  }
  function clearData() {
    setPatient({} as Patient);
  }
  function addData(patient: Patient) {
    setPatient(patient);
  }
  return (
    <RegisterContext.Provider
      value={{
        changeStep,
        clearData,
        addData,
        patient,
        step,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}
export const useRegister = () => useContext(RegisterContext);
