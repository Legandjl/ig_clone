import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { FirebaseContext } from "../firebase/FirebaseContext";
import "./Home.css";
const Home = () => {
  const nav = useNavigate();
  const { user, signOut } = useContext(FirebaseContext);
  if (user) {
    console.log(user.uid);
  }

  useEffect(() => {
    if (!user) {
      nav("/", { replace: true });
    }
  }, [user, nav]);

  return (
    <div className="homewrap">
      <div className="homeForm">
        <button onClick={signOut} />
      </div>
    </div>
  );
};

export default Home;
