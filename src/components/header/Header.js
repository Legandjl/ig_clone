import { useRef } from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { FirebaseContext } from "../firebase/FirebaseContext";
import "./Header.css";
import HeaderIcons from "./HeaderIcons";
import logo from "./logo.png";
import Notifications from "./Notifications";

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  const { notificationData, notificationsLoading, user } =
    useContext(FirebaseContext);

  useEffect(() => {}, [notificationData]);

  const showNotifications = () => {
    setMenuToggle(true);
  };

  const hideNotifications = () => {
    setMenuToggle(false);
  };

  const notifications = notificationData.map((item) => {
    return (
      <div className="notification">
        <img
          alt={"user icon"}
          style={{ width: 35, height: 35, borderRadius: 50, marginRight: 5 }}
          src={item.photoURL}
        />{" "}
        <p>
          <Link to={`user/${item.sentBy}`}> {item.senderName}</Link> likes your{" "}
          <Link to={`/p/${item.pid}`}>post</Link>
        </p>
        <i class="ri-close-circle-line"></i>
      </div>
    );
  });

  return (
    <div className="header">
      <div className="headerLogoWrap">
        <Link to="/home">
          <img alt="camera logo" src={logo} />
        </Link>
      </div>
      <HeaderIcons
        showNotifications={showNotifications}
        hideNotifications={hideNotifications}
      />
      <Notifications menuToggle={menuToggle} allNotifications={notifications} />
    </div>
  );
};

export default Header;
