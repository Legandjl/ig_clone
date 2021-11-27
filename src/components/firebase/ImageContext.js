import { Firebase } from "./Firebase";
import React, { useState, useEffect } from "react";
const ImageContext = React.createContext();

const ImageContextProvider = (props) => {
  const { getImages, uploadFile } = Firebase();

  const [allImageData, setAllImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const imageData = await getImages();

      setAllImages(() => {
        return imageData;
      });
      setImagesLoading(false);
    };
    if (imagesLoading) {
      loadData();
    }
  }, [getImages, imagesLoading]);

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
