const Notifications = (props) => {
  const open = { display: "block" };
  const closed = { display: "none" };
  return (
    <div
      className="notificationsMenu"
      style={props.menuToggle ? open : closed}
      data-notifications={true}
    >
      {props.allNotifications}
    </div>
  );
};

export default Notifications;
