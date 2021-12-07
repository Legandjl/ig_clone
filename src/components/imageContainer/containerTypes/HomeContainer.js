import DefaultLoader from "../../loaders/DefaultLoader";
import Comments from "../containerComponents/Comments";
import ImageFunctions from "../containerComponents/Functions";
import ImageHeader from "../containerComponents/ImageHeader";

const HomeContainer = ({
  imageLoaded,
  checkIfHomePage,
  profileData,
  props,
}) => {
  const { type, author, name, imageID, src } = props;

  return (
    <div className="imageContainerHome">
      <ImageHeader
        type={type}
        src={profileData.profilePictureUrl}
        username={profileData.username}
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
export default HomeContainer;
