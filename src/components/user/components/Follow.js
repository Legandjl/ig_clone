import { useEffect, useState } from "react";
import { useContext } from "react/cjs/react.development";
import useMountCheck from "../../../hooks/useMountCheck";
import { Firebase } from "../../firebase/Firebase";
import { FirebaseContext } from "../../firebase/FirebaseContext";

const Follow = (props) => {
  const { handleFollow, getFollowing } = Firebase();
  const { appUser } = useContext(FirebaseContext);
  const [following, setFollowing] = useState([]);
  const [loadingFollowing, setLoadingFollowing] = useState(true);
  const [loadingInProcess, setLoadingInProcess] = useState(false);
  const [isMounted] = useMountCheck();

  useEffect(() => {
    const loadData = async () => {
      setLoadingInProcess(true);
      const data = await getFollowing(appUser.uid);
      if (isMounted.current) {
        setFollowing(data);
        setLoadingFollowing(false);
        setLoadingInProcess(false);
      }
    };
    if (loadingFollowing && !loadingInProcess) {
      loadData();
    }
  }, [
    appUser.uid,
    getFollowing,
    isMounted,
    loadingFollowing,
    loadingInProcess,
  ]);

  const handleClick = async () => {
    await handleFollow(props.profile.uid, appUser.uid);
    setLoadingFollowing(true);
  };
  //loader on button needed
  return (
    <button onClick={handleClick}>
      {!following.includes(props.profile.uid) ? "Follow" : "Unfollow"}{" "}
    </button>
  );
};

export default Follow;
