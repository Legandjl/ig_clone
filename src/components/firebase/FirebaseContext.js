import { Firebase } from "./Firebase";
import React, { useState, useEffect } from "react";
import { useRef } from "react/cjs/react.development";
import useMountCheck from "../../hooks/useMountCheck";
const FirebaseContext = React.createContext();

const FirebaseContextProvider = (props) => {
  const fb = Firebase();
  const { getAuth } = fb;
  const [appUser, setAppUser] = useState(null);
  const [auth, setAuth] = useState(() => {
    const isAuth = fb.getAuth().currentUser;
    return isAuth;
  });

  // remove all useage of user & replace with appuser
  // change user to auth and ONLY use for auth

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingUserProfile, setLoadingUserProfile] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationData, setNotificationsData] = useState([]);

  const [isMounted] = useMountCheck();

  useEffect(() => {
    const loadNotifications = async (uid) => {
      const notificationData = await fb.getNotifications(uid);
      if (isMounted.current) {
        setNotificationsData(notificationData);
        setNotificationsLoading(false);
      }
    };

    if (notificationsLoading && appUser != null) {
      loadNotifications(appUser.uid);
    }
  }, [appUser, fb, isMounted, notificationsLoading]);

  useEffect(() => {
    getAuth().onAuthStateChanged((firebaseUser) => {
      setAuth(firebaseUser);
      setLoadingUser(false);
    });
  }, [appUser, fb, getAuth, auth]);

  useEffect(() => {
    const getUserProfile = async () => {
      setLoadingUserProfile(true);
      const profile = await fb.getUserProfile(auth.uid);

      if (isMounted.current) {
        setAppUser(() => {
          return profile;
        });
        setLoadingUserProfile(false);
      }
    };
    if (auth && !loadingUserProfile && !appUser) {
      getUserProfile();
    }
    if (!auth) {
      setAppUser(null);
    }
  }, [appUser, fb, loadingUserProfile, auth, isMounted]);

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        signOut: fb.signOut,
        loadingUser,
        getComments: fb.getImageComments,
        submitComment: fb.addComment,
        notificationsLoading,
        notificationData,
        appUser,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseContextProvider };
