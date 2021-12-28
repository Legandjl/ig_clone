import { useState, useEffect, useRef } from "react";
import { Firebase } from "../components/firebase/Firebase";
import useMountCheck from "./useMountCheck";

const useImages = () => {
  const { getImages, getNextImageBatch } = Firebase();
  const [allImageData, setAllImages] = useState([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [loadingInProcess, setLoadingInProcess] = useState(false);
  const [lastImageId, setLastImageId] = useState(null);
  const [reachedEnd, setReachedEnd] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  const [isMounted] = useMountCheck();

  useEffect(() => {
    setReachedEnd(false);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoadingInProcess(true);
      let imageData;
      try {
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
      } catch (e) {
        setLoadingInProcess(false);
        setImageLoadError(true);
      }
    };
    if (
      imagesLoading &&
      !loadingInProcess &&
      !reachedEnd &&
      isMounted.current
    ) {
      loadData();
    }
  }, [
    allImageData,
    getImages,
    getNextImageBatch,
    imagesLoading,
    isMounted,
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
    imageLoadError,
  };
};

export default useImages;
