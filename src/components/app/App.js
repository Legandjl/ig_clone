import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import Login from "../login/Login";
import Home from "../home/components/Home";
import Header from "../header/components/Header";
import Footer from "../footer/Footer";
import ImagePage from "../imagepage/ImagePage";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Page from "../user/components/Page";
import { useEffect } from "react/cjs/react.development";
import { useContext } from "react";
import { FirebaseContext } from "../firebase/FirebaseContext";

// https://www.npmjs.com/package/react-loader-spinner

const App = () => {
  const { auth, appUser } = useContext(FirebaseContext);
  const nav = useNavigate();

  useEffect(() => {
    if (!appUser || !auth) {
      nav("/", { replace: true });
    }
  }, [appUser, nav, auth]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home key={Date.now()} />} />
        <Route path="/p/:id" element={<ImagePage />} />
        <Route path="/user/:id" element={<Page />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
