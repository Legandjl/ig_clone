import { Link } from "react-router-dom";

import ImageContainerStyles from "./styles/ImageContainerStyles";

const ImageHeader = (props) => {
  return (
    <div style={ImageContainerStyles[props.type].Header}>
      <img
        src={props.src}
        style={{
          borderRadius: "50%",
          height: "1.6em",
          width: "1.6em",
          alignSelf: "center",
          marginLeft: "0.8em",
        }}
        alt="userDisplayPhoto"
      />
      <Link to={`/user/${props.author}`}>
        {" "}
        <p style={{ marginLeft: 10 }}>{props.username}</p>{" "}
      </Link>
    </div>
  );
};

export default ImageHeader;
