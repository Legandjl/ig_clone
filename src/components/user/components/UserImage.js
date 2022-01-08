import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { Firebase } from "../../firebase/Firebase";
import UserPageImageLoader from "../../loaders/UserPageImageLoader";
import useImageLoader from "../../../hooks/useImageLoader";
import useDataLoader from "../../../hooks/useDataLoader";

const UserImage = ({ element }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, loadImage] = useImageLoader();
  const { getLikes } = Firebase();
  const [loadingComplete, loadingLikes, likes, refreshLikes] = useDataLoader(
    getLikes,
    element.id
  );

  useEffect(() => {
    if (!imageLoaded) {
      loadImage(element.downloadUrl);
    }
  }, [element.downloadUrl, imageLoaded, loadImage]);

  return (
    <div className="imageFrame" style={{}}>
      <Link to={`/p/${element.id}`}>
        {" "}
        {imageLoaded ? (
          <img src={element.downloadUrl} alt={"userUpload"}></img>
        ) : (
          <UserPageImageLoader />
        )}
        {imageLoaded && (
          <div
            className={"imageLinkOverlay"}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            {" "}
            <div
              className="countWrap"
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                alignItems: "center",
                gridGap: 3,
              }}
            >
              <i
                className="ri-heart-fill"
                style={{
                  color: "white",
                  fontSize: "1.3em",
                  display: isHovered ? "inline" : "none",
                }}
              ></i>
              {loadingComplete && likes.length > 0 && (
                <p
                  style={{
                    display: isHovered ? "inline" : "none",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.4em",
                  }}
                >
                  {loadingComplete && likes.length}
                </p>
              )}
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default UserImage;
