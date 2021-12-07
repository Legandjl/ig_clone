import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CommentsError from "../../errors/CommentsError";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import CommentsLoader from "../../loaders/CommentsLoader";
import getDifference from "../utilities";
import userIcon from "./user.png";

const Comments = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [commentData, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [errored, setErrored] = useState(false);
  const { getComments, user, submitComment } = useContext(FirebaseContext);
  const isMounted = useRef(null);

  useEffect(() => {
    isMounted.current = true;
    const updateComments = async () => {
      const comments = await getComments(props.imageID);
      if (isMounted.current) {
        setComments(() => {
          return comments;
        });
        setLoading(false);
      }
    };
    if (isLoading === true) {
      updateComments();
    }
    return () => {
      isMounted.current = false;
    };
  }, [getComments, isLoading, props.imageID]);

  const handleSubmit = async () => {
    await submitComment(commentText, props.imageID, user);
    setLoading(true);
    setCommentText("");
  };

  const handleChange = (e) => {
    const updatedText = e.target.value;
    setCommentText(updatedText);
  };

  const removeComment = (id) => {
    console.log(id);
  };

  const checkIfHome = () => {
    return props.type === "HomePage";
  };

  const comments = commentData.map((comment, i) => {
    return (
      <li key={i}>
        <img
          className={"userProfileImg"}
          src={comment.posterInfo.photoURL}
          style={{ display: checkIfHome() && "none" }}
          alt="userDisplayPhoto"
          onError={(event) => {
            event.target.src = userIcon;
            event.onerror = null;
          }}
        />

        <p
          className={"listItems"}
          style={{ width: checkIfHome() && "100%" }}
          onClick={() => {
            removeComment(comment.id);
          }}
        >
          <Link
            style={{ display: "inline-block", fontWeight: "bold" }}
            className={"userLink"}
            to={`/user/${comment.uid}`}
          >
            {comment.posterInfo.poster}
          </Link>{" "}
          {checkIfHome() && comment.comment.length > 25
            ? comment.comment.substring(0, 24) + "..."
            : comment.comment}
        </p>
        <p
          className={"timeStamp"}
          style={{
            gridColumn: checkIfHome() ? 1 : 2,
          }}
        >
          {getDifference(comment.timestamp.toDate())}
        </p>
      </li>
    );
  });

  return (
    <div
      className={
        checkIfHome() ? "commentArea" : "commentArea commentAreaFullPage"
      }
    >
      <div
        className={"commentsOuter commentsWrap"}
        style={{ display: comments.length <= 0 && "none" }}
      >
        {errored ? (
          <CommentsError
            handleError={() => {
              setErrored(false);
              setLoading(true);
            }}
          />
        ) : isLoading && !checkIfHome() && comments.length > 0 ? (
          <CommentsLoader />
        ) : (
          <ul style={{ paddingLeft: "0.8em" }}>
            {comments.length <= 2 && checkIfHome()
              ? comments
              : checkIfHome()
              ? comments.slice(-2)
              : comments}
          </ul>
        )}
      </div>
      <div
        className="submitWrap"
        style={{ borderTop: checkIfHome() && comments.length <= 0 && "none" }}
      >
        <input
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={handleChange}
        />
        <button disabled={commentText.length === 0} onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};
export default Comments;
