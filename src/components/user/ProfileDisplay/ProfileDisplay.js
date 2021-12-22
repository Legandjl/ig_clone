import { useEffect, useRef, useState } from "react/cjs/react.development";
import { Firebase } from "../../firebase/Firebase";
import useImageLoader from "../../zhooks/useImageLoader";
import ProfileDetails from "./ProfileDetails";
import user from "./user.png";

const ProfileDisplay = (props) => {
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setloadingProfile] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const { getUserProfile } = Firebase();
  const isMounted = useRef(null);
  const [imageLoaded, loadImage] = useImageLoader();

  useEffect(() => {
    isMounted.current = true;
    const getProfile = async () => {
      setLoadingComplete(false);
      setloadingProfile(true);
      const profile = await getUserProfile(props.profile);
      if (isMounted.current) {
        setProfile(profile);
        setLoadingComplete(true);
      }
    };
    if (!profile && !loadingProfile) {
      getProfile();
    }
    return () => {
      isMounted.current = false;
    };
  }, [getUserProfile, loadImage, loadingProfile, profile, props.profile]);

  useEffect(() => {
    if (profile && !imageLoaded) {
      loadImage(profile.profilePictureUrl);
    }
  }, [imageLoaded, loadImage, profile]);

  return (
    <div className={"profileDisplay"}>
      <div className={"profileDisplayImage"}>
        {imageLoaded && (
          <img
            src={profile && profile.profilePictureUrl}
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
        )}
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
