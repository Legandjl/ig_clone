import { useState } from "react/cjs/react.development";
import useMountCheck from "./useMountCheck";

const useImageLoader = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMounted] = useMountCheck();

  // need an error

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
        setImageError(true);
      }
    };
  };

  return [imageLoaded, loadImage, imageError];
};

export default useImageLoader;
