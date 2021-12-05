import "../home/Home.css";
import "./container_styles/ImagePage.css";
import Comments from "./Comments";
import ImageHeader from "./ImageHeader";
import ImageFunctions from "./Functions";
import { useState, useEffect } from "react";

import DefaultLoader from "../loaders/DefaultLoader";

const ImageContainer = (props) => {
  const { type, author, src, imageID, name, info } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageLoaded) {
      const image = new Image();
      image.src = props.src;
      image.id = imageID;
      image.onload = () => {
        setImageLoaded(true);
      };
    }
  }, [imageID, imageLoaded, props.src]);

  const checkIfHomePage = () => {
    return type === "HomePage";
  };

  const getHomeContainer = () => {
    return (
      <div className="imageContainerHome">
        <ImageHeader
          type={type}
          src={info.photoURL}
          username={info.username}
          author={author}
        />

        {imageLoaded ? (
          <img alt={name} id={imageID} src={src} />
        ) : (
          <DefaultLoader />
        )}

        <ImageFunctions
          id={imageID}
          type={type}
          author={author}
          checkIfHomePage={checkIfHomePage}
        />
        <Comments imageID={imageID} type={type} />
      </div>
    );
  };

  const getFullDisplay = () => {
    return (
      <div className="imageFullDisplay">
        <div className="imageContainer">
          <img alt={name} id={imageID} src={src} />
        </div>
        <div className="socialArea">
          {" "}
          <ImageHeader
            author={author}
            type={type}
            username={info.username}
            src={info.photoURL}
          />
          <Comments imageID={imageID} type={type} />
          <ImageFunctions
            id={imageID}
            type={type}
            author={author}
            checkIfHomePage={checkIfHomePage}
          />
        </div>
      </div>
    );
  };

  return props.type === "HomePage" ? getHomeContainer() : getFullDisplay();
};

export default ImageContainer;
