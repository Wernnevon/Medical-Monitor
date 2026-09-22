import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

import "./Assets/fonts/Akshar/static/Akshar-Bold.ttf";
import "./Assets/fonts/Akshar/static/Akshar-Light.ttf";
import "./Assets/fonts/Akshar/static/Akshar-Medium.ttf";
import "./Assets/fonts/Akshar/static/Akshar-Regular.ttf";
import "./Assets/fonts/Akshar/static/Akshar-SemiBold.ttf";
import App from "./Presentation/App";

document
  .querySelector("meta[name=viewport]")
  ?.setAttribute(
    "content",
    "width=device-width, initial-scale=" + 1 / window.devicePixelRatio
  );

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
