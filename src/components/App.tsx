import React, { useEffect } from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router } from "react-router-dom";
import { TestDb } from "../Infra/DB/db";
import { ToastContextProvider } from "./Components/Context/Toast";

import SideNav from "./Pages/SideNav";
import Routes from "./routes";

import "./style.css";

function App() {
  useEffect(() => {
    async () => await TestDb();
  }, []);

  return (
    <Router>
      <div className="app">
        <SideNav />
        <ToastContextProvider>
          <Routes />
        </ToastContextProvider>
      </div>
    </Router>
  );
}

export default hot(App);
