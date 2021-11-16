import { Firebase } from "./Firebase";
import React, { useState, useEffect } from "react";
const FirebaseContext = React.createContext();

const FirebaseContextProvider = (props) => {
  const fb = Firebase();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [allImageData, setAllImages] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (isLoading) {
        const imageData = await fb.getImages();
        setAllImages(() => {
          return imageData;
        });
        setLoading(false);
      }
    };
    loadData();
  }, [fb, isLoading]);

  // might need one of these for new images
  // ie set loading true so we get the new images
  useEffect(() => {
    fb.getAuth().onAuthStateChanged((user) => {
      setUser(user);
      setLoadingUser(false);
    });
  }, [fb]);

  return (
    <FirebaseContext.Provider
      value={{
        user,
        signIn: fb.signIn,
        signOut: fb.signOut,
        loadingUser,
        uploadImage: fb.uploadFile,
        isLoading,
        allImageData,
        getComments: fb.getImageComments,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseContextProvider };
