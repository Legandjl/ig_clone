import { useRef } from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import { Firebase } from "../../firebase/Firebase";
import UserImage from "./UserImage";
import "../styles/Page.css";
import ProfileDisplay from "./ProfileDisplay";

const Page = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingInProcess, setLoadingInProcess] = useState(false);
  const [imageData, setImageData] = useState([]);
  const params = useParams();
  const { getUserImages } = Firebase();
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    const startImageLoad = async () => {
      setLoadingInProcess(true);
      const images = await getUserImages(params.id);
      if (isMounted.current) {
        setImageData(images);
        setLoadingInProcess(false);
        setImagesLoaded(true);
      }
    };

    if (!loadingInProcess && !imagesLoaded && isMounted) {
      startImageLoad();
    }

    return () => {
      isMounted.current = false;
    };
  }, [getUserImages, imagesLoaded, loadingInProcess, params.id]);

  const userImageElements = imageData.map((element) => {
    return <UserImage element={element} />;
  });

  // images > 0 ? return images || return no images found

  return (
    <div className="pageWrap" style={{ gridRow: 2 }}>
      <ProfileDisplay profile={params.id} postCount={imageData.length} />
      <div className="userpageImages">{userImageElements}</div>
    </div>
  );
};

export default Page;
