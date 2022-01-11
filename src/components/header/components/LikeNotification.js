import { Link } from "react-router-dom";
import user from "../../../images/user.png";

const LikeNotification = (props) => {
  return (
    props.show &&
    props.imageLoaded && (
      <div
        className="notification"
        key={props.elementID}
        data-notifications={true}
      >
        <Link
          to={`user/${props.notification.sentBy}`}
          data-notifications={true}
        >
          {" "}
          <img
            alt={"user icon"}
            style={{ width: 35, height: 35, borderRadius: 50, marginRight: 5 }}
            src={!props.imageError ? props.data.profilePictureUrl : user}
            data-notifications={true}
          />{" "}
        </Link>{" "}
        {"likes your "}
        <Link to={`/p/${props.notification.pid}`} data-notifications={true}>
          {" post"}
        </Link>
        <i
          className="ri-close-circle-line"
          data-notifications={true}
          onClick={props.deleteNotification}
        ></i>
      </div>
    )
  );
};

export default LikeNotification;
