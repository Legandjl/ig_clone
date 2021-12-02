import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { FileContext } from "../filepicker/FileContext";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { ImageContext } from "../firebase/ImageContext";
import CropTool from "../imageCropUtils/Cropper";
import HomeLoader from "../loaders/HomeLoader";
import "./Home.css";
import ImageContainer from "../imageContainer/ImageContainer";

const Home = () => {
  const nav = useNavigate();
  const { user } = useContext(FirebaseContext);
  const { allImageData, imagesLoading } = useContext(ImageContext);
  const { isCropping, imageSrc } = useContext(FileContext);

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
      {isCropping && <CropTool image={imageSrc} />}{" "}
      {imagesLoading ? (
        <HomeLoader />
      ) : (
        user && <div className="homeImages">{images}</div>
      )}
    </div>
  );
};

export default Home;
