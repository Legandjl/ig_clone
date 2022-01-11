import { useContext } from "react/cjs/react.development";
import useFollow from "../../../hooks/useFollow";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import FollowButton from "./FollowButton";

const ProfileDetails = (props) => {
  const { profile } = props;
  const { appUser } = useContext(FirebaseContext);
  const [following, handleFollow, refreshFollowing, followers, loadingData] =
    useFollow(profile.uid);
  const styling = { fontSize: "1.1em", fontWeight: "bold" };

  // needs styling clean up 09/01

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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gridGap: 5,
            alignItems: "center",
          }}
        >
          {" "}
          <p style={styling}>{props.postCount}</p>
          <p>Posts</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gridGap: 5,
            alignItems: "center",
          }}
        >
          {" "}
          <p style={styling}>{following.length}</p>
          <p>Following</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gridGap: 5,
            alignItems: "center",
          }}
        >
          {" "}
          <p style={styling}>{followers.length}</p>
          <p>Followers</p>
        </div>
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
