import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FirebaseContext } from "../firebase/FirebaseContext";
import "./Login.css";

const Login = () => {
  const nav = useNavigate();
  const { user, signIn } = useContext(FirebaseContext);

  useEffect(() => {
    if (user) {
      nav("/home", { replace: true });
    }
  }, [nav, user]);

  return (
    <div className="loginWrap">
      <div className="loginForm">
        <button onClick={signIn} />
      </div>
    </div>
  );
};

export default Login;
