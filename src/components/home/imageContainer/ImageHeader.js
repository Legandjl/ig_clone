import { Link } from "react-router-dom";

import Styles from "./Styles";

const ImageHeader = (props) => {
  return (
    <div style={Styles[props.type].Header}>
      <img
        src={props.src}
        style={{
          borderRadius: "50%",
          height: "1.6em",
          width: "1.6em",
          alignSelf: "center",
          marginLeft: 10,
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
