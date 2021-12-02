import { Firebase } from "./Firebase";
import React, { useState, useEffect } from "react";
const ImageContext = React.createContext();

const ImageContextProvider = (props) => {
  const { getImages, uploadFile } = Firebase();

  const [allImageData, setAllImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [loadingInProcess, setLoadingInProcess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoadingInProcess(true);
      const imageData = await getImages();
      setAllImages(() => {
        return imageData;
      });
      setTimeout(() => {
        setImagesLoading(false);
        setLoadingInProcess(false);
      }, 1500);
    };
    if (imagesLoading && !loadingInProcess) {
      loadData();
    }
  }, [getImages, imagesLoading, loadingInProcess]);

  const refreshImages = () => {
    setImagesLoading(true);
  };

  const uploadImage = async (user, file) => {
    await uploadFile(user, file);
    refreshImages();
  };

  return (
    <ImageContext.Provider value={{ allImageData, imagesLoading, uploadImage }}>
      {props.children}
    </ImageContext.Provider>
  );
};

export { ImageContext, ImageContextProvider };
