import { useParams } from "react-router";
import { useEffect, useState } from "react/cjs/react.development";
import { Firebase } from "../../firebase/Firebase";
import UserImage from "./UserImage";
import "../styles/Page.css";
import ProfileDisplay from "./ProfileDisplay";
import useDataLoader from "../../../hooks/useDataLoader";

const Page = () => {
  const params = useParams();
  const { getUserImages } = Firebase();
  const [imageData, setImageData] = useState([]);
  const [imagesLoaded, loadingInProcess, data, reloadData] = useDataLoader(
    getUserImages,
    params.id
  );

  useEffect(() => {
    if (data != null) {
      setImageData(data);
    }
  }, [data]);

  const userImageElements = imageData.map((element) => {
    return <UserImage element={element} />;
  });

  return (
    <div className="pageWrap" style={{ gridRow: 2 }}>
      <ProfileDisplay
        profile={params.id}
        postCount={imageData.length}
        imageData={loadingInProcess}
      />
      <div className="userpageImages">{userImageElements}</div>
    </div>
  );
};

export default Page;
