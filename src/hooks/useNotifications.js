import { useEffect, useState, useContext } from "react";

import { Firebase } from "../components/firebase/Firebase";
import { FirebaseContext } from "../components/firebase/FirebaseContext";
import useMountCheck from "./useMountCheck";

const useNotifications = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { appUser } = useContext(FirebaseContext);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationData, setNotificationsData] = useState([]);
  const { getNotifications } = Firebase();
  const [isMounted] = useMountCheck();

  useEffect(() => {
    const loadNotifications = async (uid) => {
      const notificationData = await getNotifications(uid);
      if (isMounted.current) {
        setNotificationsData(notificationData);
        setNotificationsLoading(false);
      }
    };

    if (notificationsLoading && appUser != null) {
      loadNotifications(appUser.uid);
    }
  }, [appUser, getNotifications, isMounted, notificationsLoading]);

  const refreshNotifications = () => {
    setNotificationsLoading(true);
  };

  const showNotifications = () => {
    refreshNotifications();
    setMenuToggle((prev) => {
      return !prev;
    });
  };

  const hideNotifications = () => {
    setMenuToggle(false);
  };

  return [
    hideNotifications,
    showNotifications,
    menuToggle,
    notificationData,
    refreshNotifications,
  ];
};

export default useNotifications;
