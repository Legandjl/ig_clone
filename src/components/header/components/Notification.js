import user from "../../../images/user.png";

const Notification = (props) => {
  const handleClick = async () => {
    await props.deleteNotification();
  };

  return (
    props.imageLoaded && (
      <div
        className="notification"
        key={props.elementID}
        data-notifications={true}
      >
        {" "}
        <img
          alt={"user icon"}
          className={"notificationUserIcon"}
          src={!props.imageError ? props.data.profilePictureUrl : user}
          data-notifications={true}
          onClick={() => props.redirect(`/user/${props.notification.sentBy}`)}
        />{" "}
        {props.notification.type === "like"
          ? "likes your "
          : "Started following you"}
        {props.notification.type === "like" && (
          <p
            data-notifications={true}
            onClick={() => {
              props.redirect(`/p/${props.notification.pid}`);
            }}
            style={{ fontWeight: "bold", cursor: "pointer" }}
          >
            {" "}
            {" post"}
          </p>
        )}
        <i
          className="ri-close-circle-line"
          data-notifications={true}
          onClick={handleClick}
        ></i>{" "}
      </div>
    )
  );
};

export default Notification;
