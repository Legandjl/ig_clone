import DefaultLoader from "../../loaders/DefaultLoader";
import Comments from "../containerComponents/Comments";
import ImageFunctions from "../containerComponents/Functions";
import ImageHeader from "../containerComponents/ImageHeader";

const HomeContainer = (props) => {
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
    <div className="imageContainerHome">
      <ImageHeader
        type={type}
        author={author}
        identifier={imageID}
        refresh={refresh}
        profile={profileData}
        isLoading={profileIsLoading}
        imageLoaded={imageLoaded}
      />

      {imageLoaded && !profileIsLoading ? (
        <img alt={name} id={imageID} src={src} />
      ) : (
        <DefaultLoader />
      )}

      <ImageFunctions
        id={imageID}
        type={type}
        author={author}
        checkIfHomePage={checkIfHomePage}
        profileIsLoading={profileIsLoading}
        imageLoaded={imageLoaded}
      />
      <Comments
        imageID={imageID}
        type={type}
        profileIsLoading={profileIsLoading}
        imageLoaded={imageLoaded}
      />
    </div>
  );
};
export default HomeContainer;
