import { useEffect } from "react/cjs/react.development";
import { Firebase } from "../../firebase/Firebase";
import useImageLoader from "../../../hooks/useImageLoader";
import ProfileDetails from "./ProfileDetails";
import user from "../../../images/user.png";

import useDataLoader from "../../../hooks/useDataLoader";

const ProfileDisplay = (props) => {
  const { getUserProfile } = Firebase();
  const [imageLoaded, loadImage] = useImageLoader();
  const [loadingComplete, loadingProfile, profile] = useDataLoader(
    getUserProfile,
    props.profile
  );

  useEffect(() => {
    if (profile && !imageLoaded) {
      loadImage(profile.profilePictureUrl);
    }
  }, [imageLoaded, loadImage, profile]);

  return (
    <div className={"profileDisplay"}>
      <div className={"profileDisplayImage"}>
        <img
          src={profile && imageLoaded ? profile.profilePictureUrl : user}
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
          }}
          onError={(event) => {
            event.target.src = user;
          }}
          alt={"userprofile"}
        ></img>
      </div>
      {profile && loadingComplete && (
        <ProfileDetails
          profile={profile}
          loadingProfile={loadingProfile}
          postCount={props.postCount}
        />
      )}
    </div>
  );
};

export default ProfileDisplay;
