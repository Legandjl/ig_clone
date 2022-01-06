import { useParams } from "react-router";
import useDataLoader from "../../hooks/useDataLoader";
import { Firebase } from "../firebase/Firebase";
import ImageContainer from "../imageContainer/containerTypes/ImageContainer";

//refactored 05/12

const ImagePage = () => {
  const { id } = useParams();
  const { getImageById } = Firebase();

  const [loadingComplete, loadingImage, image, reloadData] = useDataLoader(
    getImageById,
    id
  );

  return (
    image && (
      <ImageContainer
        imageID={id}
        src={image.downloadUrl}
        type={"ImagePage"}
        author={image.uploadedBy}
      />
    )
  );
};

export default ImagePage;
