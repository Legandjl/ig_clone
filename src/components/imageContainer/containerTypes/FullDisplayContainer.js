import CommentsTest from "../containerComponents/comments/CommentsTest";
import ImageFunctions from "../containerComponents/Functions";
import ImageHeader from "../containerComponents/ImageHeader";

const FullDisplayContainer = ({
  imageLoaded,
  checkIfHomePage,
  profileData,
  props,
}) => {
  const { type, author, name, imageID, src } = props;

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
          username={profileData.username}
          src={profileData.profilePictureUrl}
        />
        <CommentsTest imageID={imageID} type={type} />
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
