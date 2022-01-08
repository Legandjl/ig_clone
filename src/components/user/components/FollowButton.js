import { useContext } from "react/cjs/react.development";
import { FirebaseContext } from "../../firebase/FirebaseContext";

const FollowButton = (props) => {
  const { appUser } = useContext(FirebaseContext);

  const handleClick = async () => {
    await props.handleFollow(props.profile.uid, appUser.uid);
    props.refreshFollowing();
  };

  return (
    <button className={"followButton"} onClick={handleClick}>
      {!props.followers.includes(appUser.uid) ? "Follow" : "Unfollow"}{" "}
    </button>
  );
};

export default FollowButton;
