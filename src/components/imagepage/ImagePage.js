import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import useDataLoader from "../../hooks/useDataLoader";
import { Firebase } from "../firebase/Firebase";
import ImageContainer from "../imageContainer/containerTypes/ImageContainer";
import HomeLoader from "../loaders/HomeLoader";

const ImagePage = () => {
  const { id } = useParams();
  const { getImageById } = Firebase();

  const [loadingComplete, loadingImage, image, reloadData] = useDataLoader(
    getImageById,
    id
  );

  const location = useLocation();
  useEffect(() => {
    reloadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return loadingImage ? (
    <div style={{ justifySelf: "center", alignSelf: "center", gridRow: "2" }}>
      <HomeLoader />
    </div>
  ) : (
    <ImageContainer
      imageID={id}
      src={image.downloadUrl}
      type={"ImagePage"}
      author={image.uploadedBy}
      key={location.key}
    />
  );
};

export default ImagePage;
