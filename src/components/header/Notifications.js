const Notifications = (props) => {
  return (
    <div
      className="notificationsMenu"
      style={{ display: props.menuToggle ? "block" : "none" }}
    >
      {props.allNotifications}
    </div>
  );
};

export default Notifications;
