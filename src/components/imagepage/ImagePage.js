import { useNavigate, useParams } from "react-router";
import { useContext, useEffect } from "react/cjs/react.development";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { ImageContext } from "../firebase/ImageContext";
import ImageContainer from "../home/imageContainer/ImageContainer";

const ImagePage = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const { user } = useContext(FirebaseContext);
  const { allImageData, imagesLoading } = useContext(ImageContext);

  useEffect(() => {
    if (!user) {
      nav("/", { replace: true });
    }
  }, [user, nav]);

  const img = allImageData.filter((item) => {
    return item.id === id;
  });

  return (
    !imagesLoading &&
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
