import { HashRouter } from "react-router-dom";
import { ToastContextProvider } from "./Hooks/useToast";

import SideNav from "./Pages/SideNav";
import Routes from "./routes";

import "../Assets/fonts/Akshar/static/Akshar-Bold.ttf";
import "../Assets/fonts/Akshar/static/Akshar-Light.ttf";
import "../Assets/fonts/Akshar/static/Akshar-Medium.ttf";
import "../Assets/fonts/Akshar/static/Akshar-Regular.ttf";
import "../Assets/fonts/Akshar/static/Akshar-SemiBold.ttf";
import { PopupProvider } from "./Hooks/usePopup";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <SideNav />
        <PopupProvider>
          <ToastContextProvider>
            <Routes />
          </ToastContextProvider>
        </PopupProvider>
      </div>
    </HashRouter>
  );
}

export default App;
