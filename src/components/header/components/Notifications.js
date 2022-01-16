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
        <p
          style={{
            justifySelf: "center",
            textAlign: "center",
            marginTop: "0.8em",
            marginBottom: "0.8em",
          }}
        >
          No notifications to show
        </p>
      )}
    </div>
  );
};

export default Notifications;
