import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Atestado from "./Pages/Atestado";
import {
  makePatientDetailPage,
  makePatientListPage,
  makeRegisterPatientPage,
  makeExamPage,
  makePrescriptionPage,
} from "../Main/Factories/Pages/";

const MyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/pacientes">
        <Route index element={makePatientListPage()} />
        <Route path="novo" element={makeRegisterPatientPage()} />
        <Route path="editar/:id" element={makeRegisterPatientPage()} />
        <Route path="detalhes/:id">
          <Route index element={makePatientDetailPage()} />
          <Route path="exames" element={makeExamPage()} />
          <Route path="receitas" element={makePrescriptionPage()} />
        </Route>
      </Route>
      <Route path="/receitas" element={makePrescriptionPage()} />
      <Route path="/exames" element={makeExamPage()} />
      <Route path="/atestados" element={<Atestado />} />
      <Route path="*" element={<Navigate to="/pacientes" replace />} />
    </Routes>
  );
};

export default MyRoutes;
