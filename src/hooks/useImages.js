import { useState, useEffect } from "react";
import { useContext } from "react/cjs/react.development";
import { Firebase } from "../components/firebase/Firebase";
import { FirebaseContext } from "../components/firebase/FirebaseContext";
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
  const [followToggled, setFollowToggled] = useState(false);
  const { appUser } = useContext(FirebaseContext);

  useEffect(() => {
    setReachedEnd(false);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      console.log("getting data");
      setLoadingInProcess(true);
      let imageData;
      try {
        if (lastImageId === null) {
          imageData = await getImages(followToggled, appUser.uid);
        } else {
          imageData = await getNextImageBatch(
            lastImageId,
            followToggled,
            appUser.uid
          );
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
        console.error(e);
        setImageLoadError(true);
      }
    };
    if (
      imagesLoading &&
      !loadingInProcess &&
      !reachedEnd &&
      isMounted.current &&
      appUser
    ) {
      loadData();
    }
  }, [
    allImageData,
    appUser,
    followToggled,
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

  const reload = () => {
    setAllImages([]);
    setImagesLoading(true);
    setReachedEnd(false);
    setLastImageId(null);
    refreshImages();
  };

  return {
    allImageData,
    imagesLoading,
    refreshImages,
    loadingInProcess,
    reachedEnd,
    imageLoadError,
    reload,
    setFollowToggled,
    followToggled,
  };
};

export default useImages;
