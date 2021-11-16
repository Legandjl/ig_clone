import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "../login/Login";
import { FirebaseContextProvider } from "../firebase/FirebaseContext";
import Home from "../home/Home";
import Header from "../header/Header";

const App = () => {
  return (
    <FirebaseContextProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </FirebaseContextProvider>
  );
};

export default App;
