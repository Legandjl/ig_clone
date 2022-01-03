import DefaultLoader from "../../loaders/DefaultLoader";
import Comments from "../containerComponents/Comments";
import ImageFunctions from "../containerComponents/Functions";
import ImageHeader from "../containerComponents/ImageHeader";

const FullDisplayContainer = ({
  imageLoaded,
  checkIfHomePage,
  profileData,
  props,
  identifier,
  refresh,
}) => {
  const { type, author, name, imageID, src } = props;

  return (
    <div className="imageFullDisplay">
      <div className="imageContainer">
        {imageLoaded ? (
          <img alt={name} id={imageID} src={src} />
        ) : (
          <DefaultLoader />
        )}
      </div>
      <div className="socialArea">
        {" "}
        <ImageHeader
          author={author}
          type={type}
          username={profileData.username}
          src={profileData.profilePictureUrl}
          identifier={identifier}
          refresh={refresh}
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

export default FullDisplayContainer;
