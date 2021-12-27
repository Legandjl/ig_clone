import { useEffect, useRef, useState } from "react/cjs/react.development";

const useImageLoader = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMounted = useRef(null);

  // need an error

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const loadImage = (url) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      if (isMounted) {
        setImageLoaded(true);
      }
    };
  };

  return [imageLoaded, loadImage];
};

export default useImageLoader;
