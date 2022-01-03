import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import useImageLoader from "../../../hooks/useImageLoader";
import user from "../../../images/user.png";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import DeleteMenu from "./DeleteMenu";

// refactored 27/12

const ImageHeader = (props) => {
  const [imageLoaded, loadImage] = useImageLoader();
  const { appUser } = useContext(FirebaseContext);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (e) => {
    if (!e.target.dataset.menu) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (!imageLoaded) {
      loadImage(props.src);
    }
  }, [imageLoaded, loadImage, props.src]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick); // return

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

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
              setShowMenu(true);
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
