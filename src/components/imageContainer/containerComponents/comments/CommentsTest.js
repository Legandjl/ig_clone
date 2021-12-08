import CommentsLoader from "../../../loaders/DefaultLoader";
import useCommentMapper from "./useCommentMapper";
import useComments from "./useComments";

const CommentsTest = (props) => {
  const {
    handleChange,
    handleSubmit,
    checkIfHome,
    commentText,
    isLoading,
    removeComment,
    commentData,
  } = useComments(props);

  const { getCommentElements } = useCommentMapper({
    checkIfHome,
    removeComment,
    commentData,
  });

  const comments = getCommentElements();

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
        {isLoading && !checkIfHome() && comments.length > 0 ? (
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
export default CommentsTest;
