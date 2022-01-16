import { useContext, useEffect } from "react";
import useFollow from "../../../hooks/useFollow";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import FollowButton from "./FollowButton";
import user from "../../../images/user.png";
import ProfileDisplayLoader from "../../loaders/ProfileDisplayLoader";
import ProfileDetailsDisplay from "./ProfileDetailsDisplay";

const ProfileDetails = (props) => {
  const { profile } = props;
  const { appUser } = useContext(FirebaseContext);
  const [
    following,
    handleFollow,
    refreshFollowing,
    followers,
    loadingData,
    initialLoad,
  ] = useFollow(profile.uid);

  useEffect(() => {
    if (initialLoad === false) {
      props.triggerImageLoad();
    }
  }, [initialLoad, props]);

  return initialLoad ? (
    <ProfileDisplayLoader />
  ) : (
    <div className="profileDisplay">
      <div className={"profileDisplayImage"}>
        <img
          className={"userImg"}
          src={!props.imageError ? profile.profilePictureUrl : user}
          alt={"userprofile"}
        ></img>
      </div>
      <div className={"profileDisplayInformation"}>
        <ProfileDetailsDisplay
          profile={profile}
          postCount={props.postCount}
          following={following}
          followers={followers}
        />

        {appUser.uid !== profile.uid && (
          <FollowButton
            profile={profile}
            handleFollow={handleFollow}
            refreshFollowing={refreshFollowing}
            followers={followers}
            loadingData={loadingData}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
