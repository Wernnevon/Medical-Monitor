import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/main_window">
        <Redirect to="/main_window/pacientes" />
      </Route>
      <Route exact path="/main_window/pacientes" component={Patients} />
      <Route exact path="/main_window/receitas" component={Prescription} />
      <Route exact path="/main_window/exames" component={Exams} />
      <Route exact path="/main_window/atestados" component={Atestado} />
    </Switch>
  );
};

export default Routes;
