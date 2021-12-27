import userIcon from "../images/user.png";
import getDifference from "../utils/utilities.js";
import { Link } from "react-router-dom";

//needs img loader

const useCommentMapper = ({ checkIfHome, removeComment, commentData }) => {
  const getCommentElements = () => {
    return commentData.map((comment, i) => {
      return (
        <li key={i}>
          <img
            className={"userProfileImg"}
            src={comment.posterInfo.photoURL}
            style={{ display: checkIfHome() && "none" }}
            alt="userDisplayPhoto"
            onError={(event) => {
              event.target.src = userIcon;
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
  };

  return { getCommentElements };
};

export default useCommentMapper;
