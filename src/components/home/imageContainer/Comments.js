import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentsError from "../../errors/CommentsError";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import CommentsLoader from "../../loaders/CommentsLoader";
import ImageContainerStyles from "./styles/ImageContainerStyles";
import getDifference from "./utilities";

const Comments = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [commentData, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [errored, setErrored] = useState(false);
  const { getComments, user, submitComment } = useContext(FirebaseContext);

  useEffect(() => {
    const updateComments = async () => {
      const comments = await getComments(props.imageID);

      setComments(() => {
        return comments;
      });
    };
    if (isLoading === true) {
      updateComments()
        .then(() => {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((e) => {
          setLoading(false);
          setErrored(true);
        });
    }
    return () => {
      setLoading(false);
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

  const comments = commentData.map((comment, i) => {
    return (
      <li
        key={i}
        style={{
          marginTop: 10,
          marginBottom: 10,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gridGap: 5,
        }}
      >
        <img
          src={comment.posterInfo.photoURL}
          style={ImageContainerStyles[props.type].CommentUserImage}
          alt="userDisplayPhoto"
        />

        <p
          style={ImageContainerStyles[props.type].ListItems}
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
          </Link>
          {" " + comment.comment}
        </p>
        <p
          style={{
            fontSize: "0.8em",
            marginTop: 5,
            color: "#808088",
            gridColumn: props.type === "HomePage" ? 1 : 2,
          }}
        >
          {getDifference(comment.timestamp.toDate())}
        </p>
      </li>
    );
  });

  return (
    <div style={ImageContainerStyles[props.type].CommentArea}>
      <div
        className={"commentsOuter"}
        style={
          comments.length === 0
            ? {
                ...ImageContainerStyles[props.type].CommentsWrapper,
              }
            : { ...ImageContainerStyles[props.type].CommentsWrapper }
        }
      >
        {errored ? (
          <CommentsError
            handleError={() => {
              setErrored(false);
              setLoading(true);
            }}
          />
        ) : isLoading && props.type === "ImagePage" && comments.length > 0 ? (
          <CommentsLoader />
        ) : (
          <ul style={{ paddingLeft: "0.8em" }}>
            {comments.length <= 2 && props.type === "HomePage" // or type ? show all on display page
              ? comments
              : props.type === "HomePage"
              ? comments.slice(-2)
              : comments}
          </ul>
        )}
      </div>
      <div className="submitWrap">
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
