import { Firebase } from "./Firebase";
import React, { useState, useEffect } from "react";
const FirebaseContext = React.createContext();

const FirebaseContextProvider = (props) => {
  const fb = Firebase();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    fb.getAuth().onAuthStateChanged((user) => {
      setUser(user); // this needs to move to context
      setLoadingUser(false);
    });
  }, [fb]);

  return (
    <FirebaseContext.Provider
      value={{ user, signIn: fb.signIn, signOut: fb.signOut, loadingUser }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseContextProvider };
