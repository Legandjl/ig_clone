import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import { FirebaseContextProvider } from "../firebase/FirebaseContext";
import Home from "../home/Home";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ImagePage from "../imagepage/ImagePage";
import { ImageContextProvider } from "../firebase/ImageContext";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Page from "../user/Page";
import { FileContextProvider } from "../filepicker/FileContext";
// https://www.npmjs.com/package/react-loader-spinner

const App = () => {
  return (
    <FirebaseContextProvider>
      <ImageContextProvider>
        <FileContextProvider>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/p/:id" element={<ImagePage />} />
              <Route path="/user/:id" element={<Page />} />
            </Routes>
            <Footer />
          </div>
        </FileContextProvider>
      </ImageContextProvider>
    </FirebaseContextProvider>
  );
};

export default App;
