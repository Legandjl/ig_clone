import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App";
import { BrowserRouter } from "react-router-dom";
import { FileContextProvider } from "./components/filepicker/FileContext";
import { FirebaseContextProvider } from "./components/firebase/FirebaseContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContextProvider>
        <FileContextProvider>
          <App />
        </FileContextProvider>
      </FirebaseContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
