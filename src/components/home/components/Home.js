import { useContext, useEffect } from "react";
import { FileContext } from "../../filepicker/FileContext";

import ImageContainer from "../../imageContainer/containerTypes/ImageContainer";
import CropTool from "../../imageCropUtils/CropTool";
import ImageRefreshLoader from "../../loaders/ImageRefreshLoader";
import ImageLoadError from "../errors/ImageLoadError";

import useImages from "../hooks/useImages";
import useScroll from "../hooks/useScroll";
import "../styles/Home.css";

const Home = () => {
  const { isCropping, imageSrc } = useContext(FileContext);

  const {
    allImageData,
    refreshImages,
    loadingInProcess,
    reachedEnd,
    imageLoadError,
  } = useImages();
  const { bottom } = useScroll();

  useEffect(() => {
    if (bottom && !reachedEnd && !loadingInProcess) {
      refreshImages();
    }
  }, [bottom, loadingInProcess, reachedEnd, refreshImages]);

  const images = allImageData.map((imageData, i) => {
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

  return imageLoadError ? (
    <ImageLoadError />
  ) : (
    <div
      className="homeWrap"
      style={{ paddingBottom: !loadingInProcess ? "3em" : 0 }}
    >
      {isCropping && <CropTool image={imageSrc} />}{" "}
      <div className="homeImages">{images}</div>
      {loadingInProcess && <ImageRefreshLoader />}
    </div>
  );
};

export default Home;
