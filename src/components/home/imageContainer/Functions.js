import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { Firebase } from "../../firebase/Firebase";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import ImageContainerStyles from "./styles/ImageContainerStyles";

const ImageFunctions = (props) => {
  const { user } = useContext(FirebaseContext);
  const [postLiked, setPostLiked] = useState(false);
  const [postIdentifier, setPostIdentifier] = useState("");
  const [likes, setLikesData] = useState([]);
  const [likesDataLoading, setLikesDataLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);

  const isLiked = likes.find((element) => {
    return element.uid === user.uid && element.pid === props.id;
  });

  const fb = Firebase();

  useEffect(() => {
    const loadLikes = async () => {
      if (likesDataLoading) {
        const likesData = await fb.getLikes(props.id);
        setLikesData(likesData);
        setLikeCount(likesData.length);
        setLikesDataLoading(false);
      }
    };
    loadLikes();
  }, [fb, likesDataLoading, props.id]);

  useEffect(() => {
    if (isLiked !== undefined) {
      console.log(isLiked.likeIdentifier);
      setPostIdentifier(isLiked.likeIdentifier);
      setPostLiked(true);
    }
  }, [isLiked]);

  const refreshLikes = () => {
    setLikesDataLoading(true);
  };

  const likePost = async (uid, pid, author) => {
    await fb.likePost(uid, pid, author);
    refreshLikes();
  };

  const unlikePost = async (id) => {
    await fb.unlikePost(id);
    refreshLikes();
  };

  const handleLike = async () => {
    if (postLiked) {
      setPostLiked(false);
      await unlikePost(postIdentifier);
      return;
    }
    setPostLiked(true);
    await likePost(user, props.id, props.author);
  };

  return (
    <div style={ImageContainerStyles[props.type].FunctionsWrapper}>
      <div style={ImageContainerStyles[props.type].FunctionsWrapperInner}>
        <div>
          {postLiked ? (
            <i
              style={{ color: "red" }}
              className="ri-heart-fill"
              onClick={handleLike}
            ></i>
          ) : (
            <i onClick={handleLike} className="ri-heart-line"></i>
          )}

          <Link to={`/p/${props.id}`}>
            {" "}
            <i
              style={{ textDecoration: null, hover: null, active: null }}
              className="ri-chat-3-line"
            ></i>{" "}
          </Link>
        </div>
        <div
          style={{
            display:
              likeCount === 0 && props.type === "HomePage" ? "none" : "block",
            fontSize: "1.1em",
            gridRow: 2,
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "0.5em",
            }}
          >
            {props.type === "ImagePage" && likeCount === 0
              ? "Be the first to like this"
              : likeCount === 1
              ? likeCount + " like"
              : likeCount + " likes"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageFunctions;
