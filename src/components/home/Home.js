import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import FilePicker from "../filepicker/FilePicker";
import { FirebaseContext } from "../firebase/FirebaseContext";
import "./Home.css";
import ImageContainer from "./imageContainer/ImageContainer";
const Home = () => {
  const nav = useNavigate();
  const { user, signOut, allImageData, isLoading } =
    useContext(FirebaseContext);
  const images = allImageData.map((dataItem, i) => {
    return (
      <ImageContainer key={i} id={dataItem.id} src={dataItem.downloadUrl} />
    );
  });

  useEffect(() => {
    if (!user) {
      nav("/", { replace: true });
    }
  }, [user, nav]);

  return (
    <div className="homewrap">
      {user && !isLoading ? (
        <div className="homeForm">
          {images} <FilePicker />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
