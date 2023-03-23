import { HashRouter } from "react-router-dom";
import { ToastContextProvider } from "./Components/Context/Toast";

import SideNav from "./Pages/SideNav";
import Routes from "./routes";

import "./style.css";

import "./assests/fonts/Akshar/static/Akshar-Bold.ttf";
import "./assests/fonts/Akshar/static/Akshar-Light.ttf";
import "./assests/fonts/Akshar/static/Akshar-Medium.ttf";
import "./assests/fonts/Akshar/static/Akshar-Regular.ttf";
import "./assests/fonts/Akshar/static/Akshar-SemiBold.ttf";
import { useEffect, useState } from "react";
import { syncIndexedDBAndFirestore } from "./Infra/DAOarchive/patientDAO";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateIsOnline = () => {
    setIsOnline(true);
  };
  const updateIsOffline = () => {
    setIsOnline(false);
  };

  useEffect(() => {
    window.addEventListener("online", updateIsOnline);

    return () => {
      window.removeEventListener("online", updateIsOnline);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("offline", updateIsOffline);

    return () => {
      window.removeEventListener("offline", updateIsOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline) syncIndexedDBAndFirestore();
  }, [isOnline]);

  return (
    <HashRouter>
      <div className="app">
        <SideNav />
        <ToastContextProvider>
          <Routes />
        </ToastContextProvider>
      </div>
    </HashRouter>
  );
}

export default App;
