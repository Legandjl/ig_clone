import { useParams } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import { Firebase } from "../firebase/Firebase";
import "./Page.css";

const Page = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingInProcess, setLoadingInProcess] = useState(false);
  const [imageData, setImageData] = useState([]);

  const params = useParams();
  const fb = Firebase();
  useEffect(() => {
    const getUserImages = async () => {
      console.log(params.id);
      setLoadingInProcess(true);
      const images = await fb.getUserImages(params.id);
      setImageData(images);
      setLoadingInProcess(false);
      setImagesLoaded(true);
    };

    if (!loadingInProcess && !imagesLoaded) {
      getUserImages();
    }
  }, [fb, imagesLoaded, loadingInProcess, params.id]);

  const userImageElements = imageData.map((element) => {
    return (
      <div
        className="imageFrame"
        style={{ backgroundImage: `url(${element.downloadUrl})` }}
      ></div>
    );
  });

  return (
    <div className="pageWrap" style={{ gridRow: 2 }}>
      <div className="userpageImages">{userImageElements}</div>
    </div>
  );
};

export default Page;
