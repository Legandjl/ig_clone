import { useState, useEffect } from "react";
import logo from "./logo.png";
import "./Login.css";
import LoginLoader from "../loaders/LoginLoader";
import LoginInput from "./LoginInput";
import { Firebase } from "../firebase/Firebase";
import { useNavigate } from "react-router";

const Login = () => {
  const { signIn, checkForUser } = Firebase();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isNameAvailable, setIsNameAvailable] = useState(true);
  const signupDisabled = username.length < 3 || !isNameAvailable;
  const nav = useNavigate();

  const disabledButtonStyle = {
    backgroundColor: signupDisabled && "grey",
    color: signupDisabled && "white",
    outline: signupDisabled && "none",
    cursor: signupDisabled && "not-allowed",
  };

  useEffect(() => {
    let isMounted = true;
    const checker = async () => {
      const nameAvailable = await checkForUser(username);
      if (isMounted) {
        setIsNameAvailable(nameAvailable);
      }
    };
    checker();
    return () => {
      isMounted = false;
    };
  }, [checkForUser, setIsNameAvailable, username]);

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    await signIn(username);
    setIsLoggingIn(false);
    nav("/home", { replace: true });
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
