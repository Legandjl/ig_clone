const Notifications = (props) => {
  const open = { display: "block" };
  const closed = { display: "none" };

  // needs to return a loader if notifications data loading

  return (
    <div
      className="notificationsMenu"
      style={props.menuToggle ? open : closed}
      data-notifications={true}
    >
      {props.allNotifications.length > 0 ? (
        props.allNotifications
      ) : (
        <p style={{ justifySelf: "center", textAlign: "center" }}>
          No notifications to show
        </p>
      )}
    </div>
  );
};

export default Notifications;
