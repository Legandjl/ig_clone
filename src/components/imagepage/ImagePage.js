import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Firebase } from "../firebase/Firebase";
import ImageContainer from "../imageContainer/containerTypes/ImageContainer";

//refactored 05/12

const ImagePage = () => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const { getImageById } = Firebase();

  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    const startLoad = async () => {
      const image = await getImageById(id);
      if (isMounted.current) {
        setImage(() => {
          return image;
        });
        setLoadingImage(false);
      }
    };
    if (loadingImage) {
      startLoad();
    }
    return () => {
      isMounted.current = false;
    };
  }, [getImageById, id, loadingImage]);

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
