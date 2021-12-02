import { Link } from "react-router-dom";
import user from "./user.png";

const ImageHeader = (props) => {
  return (
    <div className="containerHeader">
      <img
        src={props.src}
        style={{
          borderRadius: 12,
          height: "1.6em",
          width: "1.6em",
          alignSelf: "center",
          marginLeft: "0.8em",
        }}
        alt="userDisplayPhoto"
        onError={(event) => {
          event.target.src = user;
          event.onerror = null;
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
