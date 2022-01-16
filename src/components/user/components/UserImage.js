import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Firebase } from "../../firebase/Firebase";
import UserPageImageLoader from "../../loaders/UserPageImageLoader";
import useImageLoader from "../../../hooks/useImageLoader";
import useDataLoader from "../../../hooks/useDataLoader";

const UserImage = (props) => {
  const { element, profileLoaded } = props;
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
    <div className="imageFrame">
      <Link to={`/p/${element.id}`}>
        {" "}
        {imageLoaded && profileLoaded ? (
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
            <div className="countWrap">
              <i
                className="ri-heart-fill"
                style={{
                  color: "white",
                  fontSize: "1.3em",
                  display: isHovered ? "inline" : "none",
                }}
              ></i>
              {loadingComplete && (
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
