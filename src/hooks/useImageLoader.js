import { useState } from "react";
import useMountCheck from "./useMountCheck";

const useImageLoader = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMounted] = useMountCheck();

  const loadImage = (url) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      if (isMounted.current) {
        setImageLoaded(true);
      }
    };
    image.onerror = () => {
      if (isMounted.current) {
        setImageLoaded(true);
        setImageError(true);
      }
    };
  };

  return [imageLoaded, loadImage, imageError];
};

export default useImageLoader;
