import { useContext, useEffect, useState } from "react";
import { FileContext } from "../filepicker/FileContext";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { ImageContext } from "../firebase/ImageContext";
import CropTool from "../imageCropUtils/Cropper";
import ImageContainer from "../imageContainer/ImageContainer";
import ImageRefreshLoader from "../loaders/ImageRefreshLoader";
import "./Home.css";

const Home = () => {
  const { user } = useContext(FirebaseContext);
  const { allImageData, refreshImages, loadingInProcess } =
    useContext(ImageContext);
  const { isCropping, imageSrc } = useContext(FileContext);
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight * 0.75;
      setBottom(bottom);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [refreshImages]);

  useEffect(() => {
    if (bottom) {
      refreshImages();
    }
  }, [bottom, refreshImages]);

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
    <div
      className="homeWrap"
      style={{ paddingBottom: !loadingInProcess ? "3em" : 0 }}
    >
      {isCropping && <CropTool image={imageSrc} />}{" "}
      {user && <div className="homeImages">{images}</div>}
      {loadingInProcess && <ImageRefreshLoader />}
    </div>
  );
};

export default Home;
