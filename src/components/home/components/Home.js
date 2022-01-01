import { useContext, useEffect } from "react";
import { FileContext } from "../../filepicker/FileContext";

import ImageContainer from "../../imageContainer/containerTypes/ImageContainer";
import CropTool from "../../imageCropUtils/CropTool";
import ImageRefreshLoader from "../../loaders/ImageRefreshLoader";
import ImageLoadError from "../errors/ImageLoadError";

import useImages from "../../../hooks/useImages";
import useScroll from "../../../hooks/useScroll";
import "../styles/Home.css";

const Home = () => {
  const { isCropping, imageSrc } = useContext(FileContext);

  // change all image data between followers and standard
  // maybe like refreshImageData(followers) or

  const {
    allImageData,
    refreshImages,
    loadingInProcess,
    reachedEnd,
    imageLoadError,
    reload,
    followToggled,
    setFollowToggled,
  } = useImages();
  const { bottom, reset } = useScroll();

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
      {allImageData.length > 0 && (
        <div className={"imagesToggle"}>
          <p
            onClick={() => {
              window.scrollTo(0, 0);
              reset();
              reload();
              setFollowToggled(false);
            }}
            style={{ paddingRight: 6, color: followToggled ? "gray" : "black" }}
          >
            All
          </p>{" "}
          <p
            onClick={() => {
              window.scrollTo(0, 0);
              reset();
              reload();
              setFollowToggled(true);
            }}
            style={{
              borderLeft: "solid 1px",
              paddingLeft: 6,
              color: !followToggled ? "grey" : "black",
            }}
          >
            Following
          </p>
        </div>
      )}
      <div className="homeImages">{images}</div>
      {loadingInProcess && <ImageRefreshLoader />}
    </div>
  );
};

export default Home;
