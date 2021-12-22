import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import user from "./user.png";

// refactored 06/12

const ImageHeader = (props) => {
  const [imageSrc, setImageSrc] = useState(user);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!imageLoaded && props.src !== undefined) {
      const image = new Image();
      image.src = props.src;
      image.onload = () => {
        if (isMounted) {
          setImageSrc(props.src);
          setImageLoaded(true);
        }
      };
      image.onerror = () => {
        setImageLoaded(true);
      };
    }
    return () => {
      isMounted = false;
    };
  }, [imageLoaded, props.src]);

  return (
    <div className="containerHeader">
      {imageLoaded && <img src={imageSrc} alt="userDisplayPhoto" />}

      <Link to={`/user/${props.author}`}>
        {" "}
        <p style={{ marginLeft: 10 }}>{props.username}</p>{" "}
      </Link>
    </div>
  );
};

export default ImageHeader;
