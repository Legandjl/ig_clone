import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { FirebaseContext } from "../firebase/FirebaseContext";
import logo from "./logo.png";
import "./Login.css";

const Login = () => {
  const nav = useNavigate();
  const { user, signIn, loadingUser } = useContext(FirebaseContext);

  console.log("mounted");

  useEffect(() => {
    if (user && !loadingUser) {
      nav("/home", { replace: true });
    }
  }, [loadingUser, nav, user]);

  return (
    <div className="loginWrap">
      <div className="loginForm">
        <div className={"signupHeader"}>
          <img
            alt={"logo"}
            src={logo}
            style={{
              width: 60,
              height: 60,
              justifySelf: "center",
            }}
          />
          <p>Sign Up</p>
          <div>
            {" "}
            <input
              type="text"
              style={{ borderRadius: 6 }}
              placeholder="@Username"
            />
          </div>

          <button className={"signupButton"} onClick={signIn}>
            Sign Up With Google
          </button>
          <div
            style={{
              justifySelf: "center",
              alignSelf: "start",
              display: "grid",
            }}
          >
            <p style={{ fontSize: "1em" }}>Already have an account?</p>
            <button
              onClick={signIn}
              style={{
                width: "auto",
                justifySelf: "center",
                marginTop: 8,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
