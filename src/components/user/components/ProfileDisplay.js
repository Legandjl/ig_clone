import { useEffect } from "react/cjs/react.development";
import { Firebase } from "../../firebase/Firebase";
import useImageLoader from "../../../hooks/useImageLoader";
import ProfileDetails from "./ProfileDetails";
import user from "../../../images/user.png";
import useDataLoader from "../../../hooks/useDataLoader";
import ProfileDisplayLoader from "../../loaders/ProfileDisplayLoader";

const ProfileDisplay = (props) => {
  const { getUserProfile } = Firebase();
  const [imageLoaded, loadImage, imageError] = useImageLoader();
  const [loadingComplete, loadingProfile, profile] = useDataLoader(
    getUserProfile,
    props.profile
  );

  useEffect(() => {
    if (profile && !imageLoaded) {
      loadImage(profile.profilePictureUrl);
    }
  }, [imageLoaded, loadImage, profile]);

  return loadingProfile || props.imageData || !imageLoaded ? (
    <ProfileDisplayLoader />
  ) : (
    <div className={"profileDisplay"}>
      <div className={"profileDisplayImage"}>
        <img
          src={!imageError ? profile.profilePictureUrl : user}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
          }}
          alt={"userprofile"}
        ></img>
      </div>
      <ProfileDetails
        profile={profile}
        loadingProfile={loadingProfile}
        postCount={props.postCount}
      />
    </div>
  );
};

export default ProfileDisplay;
