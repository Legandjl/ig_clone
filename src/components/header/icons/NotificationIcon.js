import { useState } from "react";

const NotificationIcon = (props) => {
  const [hovered, setHovered] = useState(false);
  return (
    <i
      style={{ position: "relative", color: props.unread > 0 && "#FFC90D" }}
      className={
        props.unread > 0 || props.menuToggle || hovered
          ? "ri-lightbulb-fill"
          : "ri-lightbulb-line"
      }
      ref={props.node}
      onMouseOver={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      {props.unread > 0 && (
        <p
          style={{
            position: "absolute",
            top: 0,
            fontSize: "0.48em",
            fontWeight: "bold",
            left: "90%",
          }}
        >
          {props.unread <= 9 ? props.unread : "9+"}
        </p>
      )}
    </i>
  );
};

export default NotificationIcon;
