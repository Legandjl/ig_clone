import { Firebase } from "./Firebase";
import React, { useState, useEffect } from "react";
const ImageContext = React.createContext();

const ImageContextProvider = (props) => {
  const { getImages, uploadFile, getNextImageBatch } = Firebase();

  const [allImageData, setAllImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [loadingInProcess, setLoadingInProcess] = useState(false);
  const [lastImageId, setLastImageId] = useState(null);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoadingInProcess(true);

      let imageData;
      if (lastImageId === null) {
        imageData = await getImages();
      } else {
        imageData = await getNextImageBatch(lastImageId);
      }
      setAllImages((prev) => {
        return [...prev, ...imageData];
      });

      setReachedEnd(() => {
        return imageData.length < 2;
      });

      setImagesLoading(false);
      setLoadingInProcess(false);
    };
    if (imagesLoading && !loadingInProcess && !reachedEnd) {
      loadData();
    }
  }, [
    allImageData,
    getImages,
    getNextImageBatch,
    imagesLoading,
    lastImageId,
    loadingInProcess,
    reachedEnd,
  ]);

  useEffect(() => {
    if (!reachedEnd && allImageData.length !== 0) {
      setLastImageId(() => {
        return allImageData[allImageData.length - 1].timestamp;
      });
    }
  }, [allImageData, reachedEnd]);

  const refreshImages = () => {
    setImagesLoading(true);
  };

  const uploadImage = async (user, file) => {
    await uploadFile(user, file);
    refreshImages();
  };

  return (
    <ImageContext.Provider
      value={{
        allImageData,
        imagesLoading,
        uploadImage,
        refreshImages,
        loadingInProcess,
      }}
    >
      {props.children}
    </ImageContext.Provider>
  );
};

export { ImageContext, ImageContextProvider };
