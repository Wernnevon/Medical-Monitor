import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ExameProvider } from "./Components/Context/ExameContext";
import Prescription from "./Pages/Prescription";
import Atestado from "./Pages/Atestado";
import Exame from "./Pages/Exame";
import Pacientes from "./Pages/Pacientes";
import { RegisterProvider } from "./Components/Context/RegisterContext";

const Exams = () => (
  <ExameProvider>
    <Exame />
  </ExameProvider>
);
const Patients = () => (
  <RegisterProvider>
    <Pacientes />
  </RegisterProvider>
);

const MyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/pacientes" element={<Patients />} />
      <Route path="/receitas" element={<Prescription />} />
      <Route path="/exames" element={<Exams />} />
      <Route path="/atestados" element={<Atestado />} />
      <Route path="*" element={<Navigate to="/pacientes" replace />} />
    </Routes>
  );
};

export default MyRoutes;
