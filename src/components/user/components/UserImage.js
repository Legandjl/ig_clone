import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { Firebase } from "../../firebase/Firebase";
import UserPageImageLoader from "../../loaders/UserPageImageLoader";
import useImageLoader from "../../../hooks/useImageLoader";

const UserImage = ({ element }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [likeCount, setLikeCount] = useState(null);
  const [imageLoaded, loadImage] = useImageLoader();

  const { getLikes } = Firebase();

  useEffect(() => {
    const getLikeCount = async () => {
      const likes = await getLikes(element.id);
      setLikeCount(likes.length);
    };
    if (likeCount === null) {
      getLikeCount();
    }
  }, [element.id, getLikes, likeCount]);

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
              {likeCount > 0 && (
                <p
                  style={{
                    display: isHovered ? "inline" : "none",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.4em",
                  }}
                >
                  {likeCount}
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
