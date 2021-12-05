import { useRef } from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { Firebase } from "../firebase/Firebase";
import { FirebaseContext } from "../firebase/FirebaseContext";
import LikeButton from "../likes/LikeButton";
import LikeCounter from "../likes/LikeCounter";

const ImageFunctions = (props) => {
  const { user } = useContext(FirebaseContext);
  const [postLiked, setPostLiked] = useState(false);
  const [postIdentifier, setPostIdentifier] = useState("");
  const [likes, setLikesData] = useState([]);
  const [likesDataLoading, setLikesDataLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0);

  const mountedRef = useRef(true);

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
    return () => {
      mountedRef.current = false;
    };
  }, [fb, likesDataLoading, props.id]);

  useEffect(() => {
    if (user) {
      const isLiked = likes.find((element) => {
        return element.uid === user.uid && element.pid === props.id;
      });

      if (isLiked !== undefined) {
        setPostIdentifier(isLiked.likeIdentifier);
        setPostLiked(true);
      }
    }
  }, [likes, props.id, user]);

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
