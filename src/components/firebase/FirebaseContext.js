import { Firebase } from "./Firebase";
import React, { useState, useEffect } from "react";
import { useRef } from "react/cjs/react.development";
const FirebaseContext = React.createContext();

const FirebaseContextProvider = (props) => {
  const fb = Firebase();
  const { getAuth } = fb;
  const [appUser, setAppUser] = useState(null);
  const [user, setUser] = useState(() => {
    const user = fb.getAuth().currentUser;
    return user;
  });

  // remove all useage of user & replace with appuser
  // change user to auth and ONLY use for auth

  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingUserProfile, setLoadingUserProfile] = useState(false);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationData, setNotificationsData] = useState([]);

  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    const loadNotifications = async (uid) => {
      const notificationData = await fb.getNotifications(uid);
      if (isMounted.current) {
        setNotificationsData(notificationData);
        setNotificationsLoading(false);
      }
    };

    if (notificationsLoading && user != null) {
      loadNotifications(user.uid);
    }
  }, [fb, notificationsLoading, user]);

  useEffect(() => {
    getAuth().onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoadingUser(false);
    });
  }, [appUser, fb, getAuth, user]);

  useEffect(() => {
    isMounted.current = true;
    const getUserProfile = async () => {
      setLoadingUserProfile(true);
      const profile = await fb.getUserProfile(user.uid);

      if (isMounted.current) {
        setAppUser(() => {
          return profile;
        });
        setLoadingUserProfile(false);
      }
    };
    if (user && !loadingUserProfile && !appUser) {
      getUserProfile();
    }
    if (!user) {
      setAppUser(null);
    }
  }, [appUser, fb, loadingUserProfile, user]);

  return (
    <FirebaseContext.Provider
      value={{
        user,
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
