import { useContext } from "react/cjs/react.development";
import useFollow from "../../../hooks/useFollow";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import FollowButton from "./FollowButton";

const ProfileDetails = (props) => {
  const { profile } = props;
  const { appUser } = useContext(FirebaseContext);
  const [following, handleFollow, refreshFollowing, followers, loadingData] =
    useFollow(profile.uid);
  const styling = { fontSize: "1.1em" };

  return (
    <div className={"profileDisplayInformation"}>
      <p style={{ alignSelf: "start", fontSize: "2em" }}>{profile.username}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          justifyItems: "start",
          textAlign: "center",
          gridGap: "6px",
        }}
      >
        <p style={styling}>{props.postCount} Posts</p>
        <p style={styling}>{following.length} Following</p>
        <p style={styling}>{followers.length} Followers</p>
      </div>
      {appUser.uid !== profile.uid && (
        <FollowButton
          profile={profile}
          handleFollow={handleFollow}
          refreshFollowing={refreshFollowing}
          followers={followers}
        />
      )}
    </div>
  );
};

export default ProfileDetails;
