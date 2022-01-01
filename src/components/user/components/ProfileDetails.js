import { useContext } from "react/cjs/react.development";
import useFollow from "../../../hooks/useFollow";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import Follow from "./Follow";

const ProfileDetails = (props) => {
  const { profile } = props;
  const { appUser } = useContext(FirebaseContext);
  const [following, handleFollow, refreshFollowing, followers] = useFollow(
    profile.uid
  );

  return (
    <div className={"profileDisplayInformation"}>
      <p style={{ alignSelf: "start", fontSize: "2em" }}>
        {profile && profile.username}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          justifyItems: "start",
          textAlign: "center",
          gridGap: "6px",
        }}
      >
        <p style={{ fontSize: "1.1em" }}>{props.postCount} Posts</p>
        <p style={{ fontSize: "1.1em" }}>{following.length} Following</p>
        <p style={{ fontSize: "1.1em" }}>{followers.length} Followers</p>
      </div>
      {appUser.uid !== profile.uid && (
        <Follow
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
