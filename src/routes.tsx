import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ExameProvider } from "./Components/Context/ExameContext";
import Prescription from "./Pages/Prescription";
import Atestado from "./Pages/Atestado";
import Exame from "./Pages/Exame";
import Pacientes from "./Pages/Pacientes";
import { RegisterProvider } from "./Components/Context/RegisterContext";
import Register from "./Pages/Pacientes/Register";
import Details from "./Pages/Pacientes/Details";

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
        <Route index element={<Pacientes />} />
        <Route path="novo" element={<RegisterPatient />} />
        <Route path="detalhes/:id" element={<Details />} />
      </Route>
      <Route path="/receitas" element={<Prescription />} />
      <Route path="/exames" element={<Exams />} />
      <Route path="/atestados" element={<Atestado />} />
      <Route path="*" element={<Navigate to="/pacientes" replace />} />
    </Routes>
  );
};

export default MyRoutes;
