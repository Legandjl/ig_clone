import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { Firebase } from "../components/firebase/Firebase";
import useMountCheck from "./useMountCheck";

const useFollow = (uid) => {
  const { handleFollow, getFollowing, getFollowers } = Firebase();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [loadingFollowing, setLoadingFollowing] = useState(true);
  const [loadingInProcess, setLoadingInProcess] = useState(false);
  const [isMounted] = useMountCheck();

  useEffect(() => {
    const loadData = async () => {
      setLoadingInProcess(true);
      const followingData = await getFollowing(uid);
      const followerData = await getFollowers(uid);
      if (isMounted.current) {
        setFollowing(followingData);
        setFollowers(followerData);
        setLoadingFollowing(false);
        setLoadingInProcess(false);
      }
    };
    if (loadingFollowing && !loadingInProcess && uid) {
      loadData();
    }
  }, [
    getFollowers,
    getFollowing,
    isMounted,
    loadingFollowing,
    loadingInProcess,
    uid,
  ]);

  const refreshFollowing = async () => {
    setLoadingFollowing(true);
  };

  return [following, handleFollow, refreshFollowing, followers];
};

export default useFollow;
