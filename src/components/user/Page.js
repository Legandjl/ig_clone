import { useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { Firebase } from "../firebase/Firebase";
import "./Page.css";

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
      if (isMounted) {
        setImageData(images);
        setLoadingInProcess(false);
        setImagesLoaded(true);
      }
    };

    if (!loadingInProcess && !imagesLoaded) {
      startImageLoad();
    }

    return () => {
      isMounted.current = false;
    };
  }, [getUserImages, imagesLoaded, loadingInProcess, params.id]);

  const userImageElements = imageData.map((element) => {
    return (
      <div className="imageFrame" style={{}}>
        <Link to={`/p/${element.id}`}>
          {" "}
          <img src={element.downloadUrl} alt={"userUpload"}></img>{" "}
        </Link>
      </div>
    );
  });

  return (
    <div className="pageWrap" style={{ gridRow: 2 }}>
      <div className="userpageImages">{userImageElements}</div>
    </div>
  );
};

export default Page;
