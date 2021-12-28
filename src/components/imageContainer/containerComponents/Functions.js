import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import useMountCheck from "../../../hooks/useMountCheck";
import { Firebase } from "../../firebase/Firebase";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import LikeButton from "../../likes/LikeButton";
import LikeCounter from "../../likes/LikeCounter";

const ImageFunctions = (props) => {
  const { appUser } = useContext(FirebaseContext);
  const [postLiked, setPostLiked] = useState(false);
  const [postIdentifier, setPostIdentifier] = useState("");
  const [likes, setLikesData] = useState([]);
  const [likesDataLoading, setLikesDataLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);
  const { getLikes, likePost, unlikePost } = Firebase();
  const [isMounted] = useMountCheck();

  //refactored 07/12

  useEffect(() => {
    const loadLikes = async () => {
      const likesData = await getLikes(props.id);
      if (isMounted.current) {
        setLikesData(likesData);
        setLikeCount(likesData.length);
        setLikesDataLoading(false);
      }
    };
    if (likesDataLoading) {
      loadLikes();
    }
  }, [getLikes, isMounted, likesDataLoading, props.id]);

  useEffect(() => {
    if (appUser) {
      const isLiked = likes.find((element) => {
        return element.uid === appUser.uid;
      });

      if (isLiked !== undefined) {
        setPostIdentifier(isLiked.likeIdentifier);
        setPostLiked(true);
      }
    }
  }, [appUser, likes]);

  const refreshLikes = () => {
    setLikesDataLoading(true);
  };

  const handleLike = async () => {
    if (postLiked) {
      setPostLiked(false);
      await unlikePost(postIdentifier);
    } else {
      setPostLiked(true);
      await likePost(appUser, props.id, props.author);
    }
    refreshLikes();
  };

  return (
    <div
      className="functionsWrapper"
      style={{ borderBottom: props.checkIfHomePage() && "none" }}
    >
      <div className="functionsWrapperInner">
        <LikeButton
          id={props.id}
          postLiked={postLiked}
          handleLike={handleLike}
        />
        <Link to={`/p/${props.id}`}>
          {" "}
          <i
            style={{ textDecoration: null, hover: null, active: null }}
            className="ri-chat-3-line"
          ></i>{" "}
        </Link>

        <div
          className={"likesCounter"}
          style={{
            display:
              likeCount === 0 && props.checkIfHomePage() ? "none" : "block",
          }}
        >
          {" "}
          <LikeCounter type={props.type} likeCount={likeCount} />
        </div>
      </div>
    </div>
  );
};

export default ImageFunctions;
