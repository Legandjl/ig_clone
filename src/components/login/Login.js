import { useState, useEffect, useContext } from "react";
import logo from "../../images/logo.png";
import "./Login.css";
import LoginLoader from "../loaders/LoginLoader";
import LoginInput from "./LoginInput";
import { Firebase } from "../firebase/Firebase";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { useNavigate } from "react-router";
import useMountCheck from "../../hooks/useMountCheck";

//refactored 21/12

const Login = () => {
  const { signIn, checkForUser } = Firebase();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const signupDisabled = username.length < 3 || !isNameAvailable;
  const [isMounted] = useMountCheck();

  const { auth, appUser } = useContext(FirebaseContext);

  const nav = useNavigate();

  const disabledButtonStyle = {
    backgroundColor: signupDisabled && "grey",
    color: signupDisabled && "white",
    outline: signupDisabled && "none",
    cursor: signupDisabled && "not-allowed",
  };

  useEffect(() => {
    if (appUser && auth) {
      if (isMounted.current) {
        setIsLoggingIn(false);
      }
      nav("/home", { replace: true });
    }
  }, [appUser, nav, auth, isMounted]);

  useEffect(() => {
    const checker = async () => {
      const nameAvailable = await checkForUser(username);
      if (isMounted.current) {
        setIsNameAvailable(nameAvailable);
      }
    };
    checker();
  }, [checkForUser, isMounted, setIsNameAvailable, username]);

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    await signIn(username);
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    if (value === " ") {
      return;
    }
    setUsername(() => {
      return value;
    });
  };

  return (
    <div className="loginWrap">
      <div className="loginForm" style={{ position: "relative" }}>
        <div className={"signupHeader"}>
          <img alt={"logo"} src={logo} />
          <p>Sign Up</p>
          <LoginInput
            handleChange={handleChange}
            username={username}
            isNameAvailable={isNameAvailable}
            isLoggingIn={isLoggingIn}
          />
          <button
            disabled={signupDisabled}
            className={"signupButton"}
            onClick={handleSignIn}
            style={disabledButtonStyle}
          >
            Sign Up With Google
          </button>
          <div className={"loginButtonAndInfo"}>
            {isLoggingIn ? <LoginLoader /> : <p>Already signed up? </p>}
            <button onClick={handleSignIn}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
