import useComments from "../../../hooks/useComments";
import CommentElement from "./CommentElement";

const Comments = (props) => {
  const {
    handleChange,
    handleSubmit,
    checkIfHome,
    commentText,
    isLoading,
    removeComment,
    data,
    refresh,
    getCommentData,
  } = useComments(props);

  const comments = getCommentData().map((comment, i) => {
    return (
      <CommentElement
        checkIfHome={checkIfHome}
        removeComment={removeComment}
        comment={comment}
        index={i}
        commentIdentifier={comment.id}
        refresh={refresh}
        key={i}
        type={checkIfHome()}
      />
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
        <ul style={{ paddingLeft: "0.8em" }}>
          {comments.length <= 2 && checkIfHome()
            ? comments
            : checkIfHome()
            ? comments.slice(-2)
            : comments}
        </ul>
      </div>
      <div
        className="submitWrap"
        style={{ borderTop: checkIfHome() && comments.length <= 0 && "none" }}
      >
        <input
          type="text"
          placeholder={"Add a comment..."}
          value={commentText}
          onChange={handleChange}
          style={{ color: props.profileIsLoading && " #edebeb" }}
        />
        <button
          style={{ color: props.profileIsLoading && " #edebeb" }}
          disabled={commentText.length === 0 || props.profileIsLoading}
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
    </div>
  );
};
export default Comments;
