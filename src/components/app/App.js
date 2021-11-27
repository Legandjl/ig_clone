import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import { FirebaseContextProvider } from "../firebase/FirebaseContext";
import Home from "../home/Home";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ImagePage from "../imagepage/ImagePage";
import { ImageContextProvider } from "../firebase/ImageContext";

const App = () => {
  return (
    <FirebaseContextProvider>
      <ImageContextProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/p/:id" element={<ImagePage />} />
            <Route path="/user/:id" element={<p>hello </p>} />
          </Routes>
          <Footer />
        </div>
      </ImageContextProvider>
    </FirebaseContextProvider>
  );
};

export default App;
