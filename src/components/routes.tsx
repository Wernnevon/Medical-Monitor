import React from 'react';
import {Route, Switch} from "react-router-dom";
import Prescription from './Pages/Prescription';
import Atestado from "./Pages/Atestado";
import Exame from "./Pages/Exame";
import Pacientes from "./Pages/Pacientes";

const Routes: React.FC = () => {
  return (
        <Switch>
              <Route exact path="/main_window/" component={()=> <div style={{ height: "100vh" }}/>}/>
              <Route exact path="/main_window/pacientes" component={Pacientes}/>
              <Route exact path="/main_window/receitas" component={Prescription}/>
              <Route exact path="/main_window/exames" component={Exame}/>
              <Route exact path="/main_window/atestados" component={Atestado}/>
        </Switch>
  );
}

export default Routes;