import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Firebase } from "../../firebase/Firebase";
import UserImage from "./UserImage";
import "../styles/Page.css";
import useDataLoader from "../../../hooks/useDataLoader";
import useImageLoader from "../../../hooks/useImageLoader";
import ProfileDisplayLoader from "../../loaders/ProfileDisplayLoader";
import ProfileDetails from "./ProfileDetails";

const Page = () => {
  const params = useParams();
  const { getUserImages, getUserProfile } = Firebase();
  const [imageData, setImageData] = useState([]);
  const [allLoaded, setAllLoaded] = useState(false);
  const [imagesLoaded, loadingInProcess, data, reloadData] = useDataLoader(
    getUserImages,
    params.id
  );
  const [loadingComplete, loadingProfile, profile] = useDataLoader(
    getUserProfile,
    params.id
  );

  const handleProfileLoadTrigger = () => {
    setAllLoaded(true);
  };

  const [imageLoaded, loadImage, imageError] = useImageLoader();

  useEffect(() => {
    if (profile && !imageLoaded) {
      loadImage(profile.profilePictureUrl);
    }
  }, [imageLoaded, loadImage, profile]);

  const location = useLocation();
  useEffect(() => {
    reloadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  useEffect(() => {
    if (data != null) {
      setImageData(data);
    }
  }, [data]);

  const userImageElements = imageData.map((element, i) => {
    return <UserImage element={element} key={i} profileLoaded={allLoaded} />;
  }); // pass all loaded into here to trigger image change from loader

  return (
    <div className="pageWrap" style={{ gridRow: 2 }}>
      {!loadingProfile && imageLoaded ? (
        <ProfileDetails
          profile={profile}
          loadingProfile={loadingProfile}
          postCount={imageData.length}
          imageError={imageError}
          triggerImageLoad={handleProfileLoadTrigger}
        />
      ) : (
        <ProfileDisplayLoader />
      )}
      {!loadingInProcess && (
        <div className="userpageImages">{userImageElements}</div>
      )}
    </div>
  );
};

export default Page;
