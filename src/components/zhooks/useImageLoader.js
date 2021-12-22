import { useState } from "react/cjs/react.development";

const useImageLoader = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const loadImage = (url) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      setImageLoaded(true);
    };
  };

  return [imageLoaded, loadImage];
};

export default useImageLoader;
