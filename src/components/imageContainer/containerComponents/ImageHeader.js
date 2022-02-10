import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import useImageLoader from "../../../hooks/useImageLoader";
import useShowMenu from "../../../hooks/useMenuToggle";
import user from "../../../images/user.png";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import ImageHeaderLoader from "../../loaders/ImageHeaderLoader";
import DeleteMenu from "./DeleteMenu";

// refactored 27/12

const ImageHeader = (props) => {
  const [imageLoaded, loadImage, imageError] = useImageLoader();
  const { appUser } = useContext(FirebaseContext);
  const [showMenu, toggleOn] = useShowMenu();

  const nav = useNavigate();

  useEffect(() => {
    if (!imageLoaded && props.profile) {
      loadImage(props.profile.profilePictureUrl);
    }
  }, [imageLoaded, loadImage, props.profile]);

  const imageDeleteCallback = () => {
    nav(`/home`, { replace: true });
  };

  return props.isLoading || !imageLoaded || !props.imageLoaded ? (
    <ImageHeaderLoader />
  ) : (
    <div className="containerHeader">
      <img
        src={!imageError ? props.profile.profilePictureUrl : user}
        alt="userDisplayPhoto"
      />

      <Link to={`/user/${props.author}`}>
        {" "}
        <p style={{ marginLeft: 10 }}>
          {props.profile && props.profile.username}
        </p>{" "}
      </Link>
      {appUser.uid === props.author && (
        <div
          style={{
            justifySelf: "end",
            alignSelf: "center",
            fontSize: "1em",
            marginRight: 14,
            position: "relative",
          }}
          data-menu={true}
        >
          <i
            onClick={(e) => {
              toggleOn(e);
            }}
            style={{ color: showMenu ? "gray" : "black", fontSize: "1.4em" }}
            className="ri-more-line"
          ></i>

          {showMenu && (
            <DeleteMenu
              identifier={props.identifier}
              refresh={props.refresh}
              type={"images"}
              cb={imageDeleteCallback}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageHeader;
