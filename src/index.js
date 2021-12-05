import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/App";
import { BrowserRouter } from "react-router-dom";
import { FileContextProvider } from "./components/filepicker/FileContext";
import { FirebaseContextProvider } from "./components/firebase/FirebaseContext";
import { ImageContextProvider } from "./components/firebase/ImageContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseContextProvider>
        <ImageContextProvider>
          <FileContextProvider>
            <App />
          </FileContextProvider>
        </ImageContextProvider>
      </FirebaseContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
