import { useEffect, useState } from "react";

import { Firebase } from "../components/firebase/Firebase";
import useMountCheck from "./useMountCheck";

const useFollow = (uid) => {
  const { handleFollow, getFollowing, getFollowers } = Firebase();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loadingFollowing, setLoadingFollowing] = useState(true);
  const [loadingInProcess, setLoadingInProcess] = useState(true);
  const [isMounted] = useMountCheck();

  useEffect(() => {
    const loadData = async () => {
      const followingData = await getFollowing(uid);
      const followerData = await getFollowers(uid);
      if (isMounted.current) {
        setFollowing(followingData);
        setFollowers(followerData);
        setLoadingFollowing(false);
        setLoadingInProcess(false);
        setInitialLoad(false);
      }
    };
    if (loadingFollowing && loadingInProcess && uid) {
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
    setLoadingInProcess(true);
  };

  return [
    following,
    handleFollow,
    refreshFollowing,
    followers,
    loadingInProcess,
    initialLoad,
  ];
};

export default useFollow;
