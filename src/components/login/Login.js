import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { FirebaseContext } from "../firebase/FirebaseContext";
import "./Login.css";

const Login = () => {
  const nav = useNavigate();
  const { user, signIn, loadingUser } = useContext(FirebaseContext);

  useEffect(() => {
    if (user && !loadingUser) {
      nav("/home", { replace: true });
    }
  }, [loadingUser, nav, user]);

  return (
    <div className="loginWrap">
      <div className="loginForm">
        <button onClick={signIn} />
      </div>
    </div>
  );
};

export default Login;
