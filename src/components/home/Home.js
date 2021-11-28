import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import CropTool from "../imageCropUtils/Cropper";
import { FileContext } from "../filepicker/FileContext";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { ImageContext } from "../firebase/ImageContext";

import "./Home.css";
import ImageContainer from "./imageContainer/ImageContainer";

const Home = () => {
  const nav = useNavigate();
  const { user } = useContext(FirebaseContext);
  const { allImageData } = useContext(ImageContext);
  const { isCropping, imageSrc } = useContext(FileContext);

  console.log(isCropping);

  useEffect(() => {
    if (!user) {
      nav("/", { replace: true });
    }
  }, [user, nav]);

  const images = allImageData.map((dataItem, i) => {
    return (
      <ImageContainer
        key={i}
        imageID={dataItem.id}
        src={dataItem.downloadUrl}
        author={dataItem.uploadedBy}
        type={"HomePage"}
        headerImg={dataItem.info.photoURL}
        headerName={dataItem.info.username}
        info={dataItem.info}
      />
    );
  });

  return (
    <div className="homeWrap">
      {user && <div className="homeImages">{images}</div>}
    </div>
  );
};

export default Home;
