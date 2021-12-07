import { Link } from "react-router-dom";
import user from "./user.png";

// refactored 06/12

const ImageHeader = (props) => {
  return (
    <div className="containerHeader">
      <img
        src={props.src}
        alt="userDisplayPhoto"
        onError={(event) => {
          event.target.src = user;
        }}
      />
      <Link to={`/user/${props.author}`}>
        {" "}
        <p style={{ marginLeft: 10 }}>{props.username}</p>{" "}
      </Link>
    </div>
  );
};

export default ImageHeader;
