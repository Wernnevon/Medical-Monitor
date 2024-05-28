import { HashRouter } from "react-router-dom";
import { ToastContextProvider } from "./Hooks/useToast";

import SideNav from "./Pages/SideNav";
import Routes from "./routes";

import "./style.css";

import "./assests/fonts/Akshar/static/Akshar-Bold.ttf";
import "./assests/fonts/Akshar/static/Akshar-Light.ttf";
import "./assests/fonts/Akshar/static/Akshar-Medium.ttf";
import "./assests/fonts/Akshar/static/Akshar-Regular.ttf";
import "./assests/fonts/Akshar/static/Akshar-SemiBold.ttf";

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
