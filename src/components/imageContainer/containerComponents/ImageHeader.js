import { Link } from "react-router-dom";
import { useContext, useEffect } from "react/cjs/react.development";
import useImageLoader from "../../../hooks/useImageLoader";
import useShowMenu from "../../../hooks/useMenuToggle";
import user from "../../../images/user.png";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import DeleteMenu from "./DeleteMenu";

// refactored 27/12

const ImageHeader = (props) => {
  const [imageLoaded, loadImage] = useImageLoader();
  const { appUser } = useContext(FirebaseContext);
  const [showMenu, toggleOn] = useShowMenu();

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
      {appUser.uid === props.author && (
        <div
          style={{
            justifySelf: "end",
            alignSelf: "center",
            fontSize: "1.6em",
            marginRight: 14,
            fontWeight: "bold",
            position: "relative",
          }}
          data-menu={true}
        >
          <i
            data-menu={true}
            onClick={() => {
              toggleOn();
            }}
            style={{ color: showMenu ? "gray" : "black" }}
            class="ri-more-line"
          ></i>

          {showMenu && (
            <DeleteMenu identifier={props.identifier} refresh={props.refresh} />
          )}
        </div>
      )}
    </div>
  );
};

export default ImageHeader;
