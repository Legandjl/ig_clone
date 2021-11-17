import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import { FirebaseContext } from "../firebase/FirebaseContext";
import "./Home.css";
import ImageContainer from "./imageContainer/ImageContainer";
const Home = () => {
  const nav = useNavigate();

  const { user, allImageData, isLoading } = useContext(FirebaseContext);
  if (user) {
    console.log(user.displayName);
  }
  const images = allImageData.map((dataItem, i) => {
    return user ? (
      <ImageContainer
        key={i}
        id={dataItem.id}
        src={dataItem.downloadUrl}
        username={user.displayName}
      />
    ) : null;
  });

  useEffect(() => {
    if (!user) {
      nav("/", { replace: true });
    }
  }, [user, nav]);

  return (
    <div className="homeWrap">
      {user && !isLoading ? <div className="homeImages">{images}</div> : null}
    </div>
  );
};

export default Home;
