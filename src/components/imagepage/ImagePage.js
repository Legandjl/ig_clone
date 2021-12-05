import { useParams } from "react-router";
import { useContext } from "react/cjs/react.development";
import { ImageContext } from "../firebase/ImageContext";
import ImageContainer from "../imageContainer/ImageContainer";

const ImagePage = () => {
  const { id } = useParams();
  const { allImageData } = useContext(ImageContext);
  // get specific image
  // image doesnt exist show page not found
  const img = allImageData.filter((item) => {
    return item.id === id;
  });

  return (
    img[0] !== undefined && (
      <ImageContainer
        imageID={img[0].id}
        src={img[0].downloadUrl}
        type={"ImagePage"}
        author={img[0].uploadedBy}
        info={img[0].info}
        headerImg={img[0].info.photoURL}
        headerName={img[0].info.username}
      />
    )
  );
};

export default ImagePage;
