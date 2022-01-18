const Notifications = (props) => {
  const open = { display: "block" };
  const closed = { display: "none" };

  return (
    <div
      className="notificationsMenu"
      style={props.menuToggle ? open : closed}
      data-notifications={true}
    >
      {props.allNotifications.length > 0 ? (
        props.allNotifications
      ) : (
        <p className={"noNotifs"}>No notifications to show</p>
      )}
    </div>
  );
};

export default Notifications;
