import DefaultLoader from "../../loaders/DefaultLoader";
import Comments from "../containerComponents/Comments";
import ImageFunctions from "../containerComponents/Functions";
import ImageHeader from "../containerComponents/ImageHeader";

const FullDisplayContainer = (props) => {
  const {
    type,
    author,
    name,
    imageID,
    src,
    checkIfHomePage,
    profileData,
    profileIsLoading,
    imageLoaded,
    refresh,
  } = props.props;

  return (
    <div className="imageFullDisplay">
      <div className="imageContainer">
        {imageLoaded && !profileIsLoading ? (
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
          identifier={imageID}
          refresh={refresh}
          profile={profileData}
          isLoading={profileIsLoading}
          imageLoaded={imageLoaded}
        />
        <Comments
          imageID={imageID}
          type={type}
          profileIsLoading={profileIsLoading}
        />
        <ImageFunctions
          id={imageID}
          type={type}
          author={author}
          checkIfHomePage={checkIfHomePage}
          profileIsLoading={profileIsLoading}
        />
      </div>
    </div>
  );
};

export default FullDisplayContainer;
