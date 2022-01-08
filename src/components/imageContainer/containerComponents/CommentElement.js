import userIcon from "../../../images/user.png";
import getDifference from "../../../utils/utilities";
import { Link } from "react-router-dom";
import DeleteMenu from "./DeleteMenu";
import useShowMenu from "../../../hooks/useMenuToggle";
import { useContext, useState } from "react/cjs/react.development";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import useDataLoader from "../../../hooks/useDataLoader";
import { Firebase } from "../../firebase/Firebase";
import CommentsLoader from "../../loaders/CommentsLoader";

//needs img loader
const CommentElement = ({
  checkIfHome,
  comment,
  index,
  commentIdentifier,
  refresh,
}) => {
  const { appUser } = useContext(FirebaseContext);
  const [showMenu, setShowMenu, setCloseMenu] = useShowMenu();
  const [showDotMenu, setShowDotMenu] = useState(false);
  const { getUserProfile } = Firebase();
  const [loadingComplete, loadingProfile, profile, reloadProfile] =
    useDataLoader(getUserProfile, comment.uid);
  const commentDeleteCallback = () => {
    refresh();
    setCloseMenu();
  };
  return loadingProfile ? (
    <CommentsLoader type={checkIfHome()} />
  ) : (
    <li
      style={{ marginTop: 10, paddingLeft: "0.6em" }}
      onMouseEnter={() => {
        setShowDotMenu(true);
      }}
      onMouseLeave={() => {
        setShowDotMenu(false);
      }}
    >
      <img
        className={"userProfileImg"}
        src={profile.profilePictureUrl}
        style={{ display: checkIfHome() && "none" }}
        alt="userDisplayPhoto"
        onError={(event) => {
          event.target.src = userIcon;
        }}
      />

      <p className={"listItems"} style={{ width: checkIfHome() && "100%" }}>
        <Link
          style={{ display: "inline-block", fontWeight: "bold" }}
          className={"userLink"}
          to={`/user/${comment.uid}`}
        >
          {profile.username}
        </Link>{" "}
        {checkIfHome() && comment.comment.length > 25
          ? comment.comment.substring(0, 24) + "..."
          : comment.comment}
      </p>
      <div
        style={{
          display: "grid",
          gridColumn: checkIfHome() ? 1 : 2,
          gridTemplateColumns: "auto auto",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "start",
          justifyItems: "start",
          gridGap: 5,
        }}
      >
        <p className={"timeStamp"}>
          {getDifference(comment.timestamp.toDate())}
        </p>
        {comment.uid === appUser.uid && (
          <div
            style={{
              position: "relative",
              fontSize: "0.8em",
            }}
          >
            <i
              onClick={setShowMenu}
              className="ri-more-line"
              style={{
                color: showMenu ? "gray" : "black",
                fontSize: "1.5em",
                opacity: showDotMenu || showMenu ? 1 : 0,
              }}
            ></i>
            {showMenu && (
              <DeleteMenu
                type={"comments"}
                identifier={commentIdentifier}
                cb={commentDeleteCallback}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default CommentElement;
