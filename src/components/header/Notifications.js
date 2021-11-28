const Notifications = (props) => {
  const open = { display: "block" };
  const closed = { display: "none" };
  return (
    <div className="notificationsMenu" style={props.menuToggle ? open : closed}>
      {props.allNotifications}
    </div>
  );
};

export default Notifications;
