import { Firebase } from "./Firebase";
import React, { useState, useEffect } from "react";
const FirebaseContext = React.createContext();

const FirebaseContextProvider = (props) => {
  const fb = Firebase();
  const { getAuth } = fb;
  const [user, setUser] = useState(() => {
    const user = fb.getAuth().currentUser;
    return user;
  });

  const [loadingUser, setLoadingUser] = useState(true);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationData, setNotificationsData] = useState([]);

  useEffect(() => {
    const loadNotifications = async (uid) => {
      const notificationData = await fb.getNotifications(uid);
      setNotificationsData(notificationData);
      setNotificationsLoading(false);
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
  }, [getAuth]);

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
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseContextProvider };
