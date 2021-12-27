import { Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import useImageLoader from "../../../hooks/useImageLoader";
import user from "../../../images/user.png";

// refactored 27/12

// todo - change user img to an img loader

const ImageHeader = (props) => {
  const [imageLoaded, loadImage] = useImageLoader();

  useEffect(() => {
    if (!imageLoaded) {
      loadImage(props.src);
    }
  }, [imageLoaded, loadImage, props.src]);

  return (
    <div className="containerHeader">
      {<img src={imageLoaded ? props.src : user} alt="userDisplayPhoto" />}

      <Link to={`/user/${props.author}`}>
        {" "}
        <p style={{ marginLeft: 10 }}>{props.username}</p>{" "}
      </Link>
    </div>
  );
};

export default ImageHeader;
