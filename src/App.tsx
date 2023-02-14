import { HashRouter } from "react-router-dom";
import { ToastContextProvider } from "./Components/Context/Toast";

import SideNav from "./Pages/SideNav";
import Routes from "./routes";

import "./style.css";

function App() {
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
