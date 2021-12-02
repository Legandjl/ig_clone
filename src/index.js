import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App";
import { BrowserRouter } from "react-router-dom";
import { FileContextProvider } from "./components/filepicker/FileContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
