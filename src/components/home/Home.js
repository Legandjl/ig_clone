import { useContext, useEffect } from "react";
import { FileContext } from "../filepicker/FileContext";
import { FirebaseContext } from "../firebase/FirebaseContext";
import ImageContainer from "../imageContainer/containerTypes/ImageContainer";
import CropTool from "../imageCropUtils/CropTool";
import ImageRefreshLoader from "../loaders/ImageRefreshLoader";
import "./Home.css";
import useImages from "./useImages";
import useScroll from "./useScroll";

const Home = () => {
  const { isCropping, imageSrc } = useContext(FileContext);
  const { user } = useContext(FirebaseContext);
  const { allImageData, refreshImages, loadingInProcess, reachedEnd } =
    useImages();
  const { bottom } = useScroll();

  useEffect(() => {
    if (bottom && !reachedEnd && !loadingInProcess) {
      refreshImages();
    }
  }, [bottom, loadingInProcess, reachedEnd, refreshImages]);

  const images = allImageData.map((imageData, i) => {
    console.log("mapping");
    return (
      <ImageContainer
        key={i}
        imageID={imageData.id}
        src={imageData.downloadUrl}
        author={imageData.uploadedBy}
        type={"HomePage"}
      />
    );
  });

  return (
    <div
      className="homeWrap"
      style={{ paddingBottom: !loadingInProcess ? "3em" : 0 }}
    >
      {isCropping && (
        <CropTool image={imageSrc} refreshImages={refreshImages} />
      )}{" "}
      {user && <div className="homeImages">{images}</div>}
      {loadingInProcess && <ImageRefreshLoader />}
    </div>
  );
};

export default Home;
