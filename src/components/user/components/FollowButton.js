import { useContext } from "react";
import { FirebaseContext } from "../../firebase/FirebaseContext";

const FollowButton = (props) => {
  const { appUser } = useContext(FirebaseContext);

  const handleClick = async () => {
    await props.handleFollow(props.profile.uid, appUser.uid);
    props.refreshFollowing();
  };

  return (
    <button className={"followButton"} onClick={handleClick}>
      {!props.loadingData
        ? props.followers.includes(appUser.uid)
          ? "Unfollow"
          : "Follow"
        : "..."}{" "}
    </button>
  );
};

export default FollowButton;
