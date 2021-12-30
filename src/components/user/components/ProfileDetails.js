import { useContext } from "react/cjs/react.development";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import Follow from "./Follow";

const ProfileDetails = (props) => {
  const { profile } = props;
  const { appUser } = useContext(FirebaseContext);

  console.log(profile);
  console.log(appUser);

  return (
    <div className={"profileDisplayInformation"}>
      <p style={{ alignSelf: "start", fontSize: "2em" }}>
        {profile && profile.username}
      </p>
      <p style={{ fontSize: "1.1em" }}>{props.postCount} posts</p>
      {appUser.uid !== profile.uid && <Follow profile={profile} />}
    </div>
  );
};

export default ProfileDetails;
