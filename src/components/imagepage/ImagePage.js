import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useMountCheck from "../../hooks/useMountCheck";
import { Firebase } from "../firebase/Firebase";
import ImageContainer from "../imageContainer/containerTypes/ImageContainer";

//refactored 05/12

const ImagePage = () => {
  const [loadingImage, setLoadingImage] = useState(true);
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const { getImageById } = Firebase();

  const [isMounted] = useMountCheck();

  useEffect(() => {
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
  }, [getImageById, id, isMounted, loadingImage]);

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
