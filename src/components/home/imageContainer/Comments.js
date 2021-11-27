import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import Styles from "./Styles";
import getDifference from "./utilities";

const Comments = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [commentData, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { getComments, user, submitComment } = useContext(FirebaseContext);

  useEffect(() => {
    const updateComments = async () => {
      const comments = await getComments(props.imageID);
      setComments(() => {
        return comments;
      });
    };
    if (isLoading === true) {
      updateComments();
      setLoading(false);
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

  console.log(props.type);

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
          style={{
            borderRadius: "50%",
            height: "1.6em",
            width: "1.6em",
            gridRow: "1/3",
            alignSelf: "end",
            marginRight: 10,
            display: props.type === "HomePage" ? "none" : "block",
          }}
          alt="userDisplayPhoto"
        />
        <Link className={"userLink"} to={`/user/${comment.uid}`}>
          <p className="commentAuthor">{comment.posterInfo.poster}</p>
        </Link>
        <p
          style={Styles[props.type].ListItems}
          onClick={() => {
            removeComment(comment.id);
          }}
        >
          {comment.comment}
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
    <div style={Styles[props.type].CommentArea}>
      <div
        className={"commentsOuter"}
        style={
          comments.length === 0 && props.type === "HomePage"
            ? {
                ...Styles[props.type].CommentsWrapper,
                paddingTop: 5,
              }
            : { ...Styles[props.type].CommentsWrapper }
        }
      >
        <ul>
          {isLoading
            ? null
            : comments.length <= 2 && props.type === "HomePage" // or type ? show all on display page
            ? comments
            : props.type === "HomePage"
            ? comments.slice(-2)
            : comments}
        </ul>
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
