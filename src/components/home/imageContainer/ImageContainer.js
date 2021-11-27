import "../Home.css";
import Comments from "./Comments";
import ImageHeader from "./ImageHeader";
import ImageFunctions from "./Functions";

const ImageContainer = (props) => {
  const { type, author, src, imageID, name, info } = props;

  const getHomeContainer = () => {
    return (
      <div className="imageContainerHome">
        <ImageHeader
          type={type}
          src={info.photoURL}
          username={info.username}
          author={author}
        />
        <img alt={name} id={imageID} src={src} />
        <ImageFunctions id={imageID} type={type} author={author} />
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
          <ImageFunctions id={imageID} type={type} author={author} />
        </div>
      </div>
    );
  };

  return props.type === "HomePage" ? getHomeContainer() : getFullDisplay();
};

export default ImageContainer;
