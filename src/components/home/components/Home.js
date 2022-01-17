import { useContext, useEffect } from "react";
import { FileContext } from "../../filepicker/FileContext";
import ImageContainer from "../../imageContainer/containerTypes/ImageContainer";
import CropTool from "../../imageCropUtils/CropTool";
import ImageRefreshLoader from "../../loaders/ImageRefreshLoader";
import ImageLoadError from "../errors/ImageLoadError";
import useImages from "../../../hooks/useImages";
import useScroll from "../../../hooks/useScroll";
import "../styles/Home.css";
import HomeImageToggle from "./HomeImageToggle";

const Home = () => {
  const { isCropping, imageSrc } = useContext(FileContext);

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
      reset();
    }
  }, [bottom, loadingInProcess, reachedEnd, refreshImages, reset]);

  const refreshSelection = (bool) => {
    setFollowToggled(bool);
    window.scrollTo(0, 0);
    reset();
    reload();
  };

  const images = allImageData.map((imageData, i) => {
    return (
      <ImageContainer
        key={i}
        imageID={imageData.id}
        src={imageData.downloadUrl}
        author={imageData.uploadedBy}
        type={"HomePage"}
        refresh={refreshSelection}
      />
    );
  });

  const emptyFollowers =
    images.length === 0 && followToggled && !loadingInProcess;

  return imageLoadError ? (
    <ImageLoadError />
  ) : (
    <div
      className="homeWrap"
      style={{ paddingBottom: !loadingInProcess ? "3em" : 0 }}
    >
      {isCropping && <CropTool image={imageSrc} />}{" "}
      <HomeImageToggle
        refreshSelection={refreshSelection}
        followToggled={followToggled}
      />
      <div className="homeImages">{images}</div>
      {loadingInProcess && <ImageRefreshLoader />}
      {emptyFollowers && (
        <p style={{ alignSelf: "center" }}>You are not following anyone!</p>
      )}
    </div>
  );
};

export default Home;
