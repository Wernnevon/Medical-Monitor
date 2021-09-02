import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router } from 'react-router-dom';
import {ExameProvider} from './Components/Context/ExameContext';
import {TestDb} from '../Infra/DB/db';

import SideNav from "./Pages/SideNav";
import Routes from "./routes";

import "./style.css";

function App() {

  useEffect(()=>{
    async()=> await TestDb();
  },[])

  return (
    <Router>
      <div className="app">
      <SideNav/>
      <ExameProvider>
        <Routes/>
      </ExameProvider>
      </div>
    </Router>
  );
}

export default hot(App);
