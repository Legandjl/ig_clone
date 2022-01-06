import DefaultLoader from "../../loaders/DefaultLoader";
import Comments from "../containerComponents/Comments";
import ImageFunctions from "../containerComponents/Functions";
import ImageHeader from "../containerComponents/ImageHeader";

const HomeContainer = ({
  imageLoaded,
  checkIfHomePage,
  profileData,
  props,
  identifier,
  refresh,
}) => {
  const { type, author, name, imageID, src } = props;

  return (
    <div className="imageContainerHome">
      <ImageHeader
        type={type}
        author={author}
        identifier={identifier}
        refresh={refresh}
        profile={profileData}
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
export default HomeContainer;
