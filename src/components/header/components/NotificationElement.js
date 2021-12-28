import { Link } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import useImageLoader from "../../../hooks/useImageLoader";
import user from "../../../images/user.png";

// link needs to be onclick use nav redirect
// as it doesnt work if not on home page
// needs image loader for notification

const NotificationElement = (props) => {
  const [imageLoaded, loadImage, imageError] = useImageLoader();

  useEffect(() => {
    if (!imageLoaded) {
      loadImage(props.photoURL);
    }
  }, [imageLoaded, loadImage, props.photoURL]);

  const deleteNotification = () => {
    setShow(false);
  };
  const [show, setShow] = useState(true);
  return (
    show && (
      <div
        className="notification"
        key={props.elementID}
        data-notifications={true}
      >
        <Link to={`user/${props.sentBy}`} data-notifications={true}>
          {" "}
          <img
            alt={"user icon"}
            style={{ width: 35, height: 35, borderRadius: 50, marginRight: 5 }}
            src={imageLoaded ? props.photoURL : user}
            data-notifications={true}
          />{" "}
        </Link>{" "}
        {"likes your "}
        <Link to={`/p/${props.pid}`} data-notifications={true}>
          {" post"}
        </Link>
        <i
          className="ri-close-circle-line"
          data-notifications={true}
          onClick={deleteNotification}
        ></i>
      </div>
    )
  );
};

export default NotificationElement;
