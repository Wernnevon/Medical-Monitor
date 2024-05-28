import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ExameProvider } from "./Hooks/useExam";
import Prescription from "./Pages/Prescription";
import Atestado from "./Pages/Atestado";
import Exame from "./Pages/Exame";
import { List, Details, Register } from "./Pages/Pacientes";
import { RegisterProvider } from "./Hooks/useRegister";

const Exams = () => (
  <ExameProvider>
    <Exame />
  </ExameProvider>
);
const RegisterPatient = () => (
  <RegisterProvider>
    <Register />
  </RegisterProvider>
);

const MyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/pacientes">
        <Route index element={<List />} />
        <Route path="novo" element={<RegisterPatient />} />
        <Route path="editar/:id" element={<RegisterPatient />} />
        <Route path="detalhes/:id">
          <Route index element={<Details />} />
          <Route path="exames" element={<Exams />} />
          <Route path="receitas" element={<Prescription />} />
        </Route>
      </Route>
      <Route path="/receitas" element={<Prescription />} />
      <Route path="/exames" element={<Exams />} />
      <Route path="/atestados" element={<Atestado />} />
      <Route path="*" element={<Navigate to="/pacientes" replace />} />
    </Routes>
  );
};

export default MyRoutes;
