import { useState, useEffect, useRef } from "react";
import { Firebase } from "../firebase/Firebase";

const useImages = () => {
  const { getImages, getNextImageBatch } = Firebase();
  const [allImageData, setAllImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [loadingInProcess, setLoadingInProcess] = useState(false);
  const [lastImageId, setLastImageId] = useState(null);
  const [reachedEnd, setReachedEnd] = useState(false);

  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    const loadData = async () => {
      if (isMounted.current) {
        setLoadingInProcess(true);
      }
      let imageData;
      if (lastImageId === null) {
        imageData = await getImages();
      } else {
        imageData = await getNextImageBatch(lastImageId);
      }
      if (isMounted.current) {
        setAllImages((prev) => {
          return [...prev, ...imageData];
        });
        setReachedEnd(() => {
          return imageData.length < 2;
        });
        setImagesLoading(false);
        setLoadingInProcess(false);
      }
    };
    if (imagesLoading && !loadingInProcess && !reachedEnd) {
      loadData();
    }

    return () => {
      isMounted.current = false;
    };
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

  return {
    allImageData,
    imagesLoading,
    refreshImages,
    loadingInProcess,
    reachedEnd,
  };
};

export default useImages;
