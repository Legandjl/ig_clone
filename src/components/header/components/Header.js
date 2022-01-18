import { useContext, useEffect, useState } from "react";
import { FileContext } from "../../filepicker/FileContext";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import CropTool from "../../imageCropUtils/CropTool";
import "../styles/Header.css";
import HeaderIcons from "./HeaderIcons";
import logo from "../../../images/logo.png";
import Notifications from "./Notifications";
import { useLocation, useNavigate } from "react-router";
import NotificationElement from "./NotificationElement";
import useNotifications from "../../../hooks/useNotifications";

const Header = () => {
  const { auth } = useContext(FirebaseContext);
  const { isCropping, imageSrc } = useContext(FileContext);
  const [unreadNotifications, setUnread] = useState(0);

  const nav = useNavigate();
  const location = useLocation();

  const [
    hideNotifications,
    showNotifications,
    menuToggle,
    notificationData,
    refreshNotifications,
  ] = useNotifications();

  const navigate = () => {
    if (location.pathname === "/home") {
      window.scrollTo(0, 0);
    } else {
      nav("/home", { replace: true });
    }
  };

  useEffect(() => {
    refreshNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);
  //refresh notifications on navigation

  const handleRedirect = (loc) => {
    nav(loc, { replace: "true" });
    hideNotifications();
  };

  useEffect(() => {
    const unread = notificationData.filter((data) => {
      return !data.read;
    });

    setUnread(unread);
  }, [notificationData]);

  const notifications = notificationData.map((item, i) => {
    return (
      <NotificationElement
        elementID={i}
        refreshNotifications={refreshNotifications}
        notification={item}
        key={i}
        redirect={handleRedirect}
      />
    );
  });

  return (
    <div className="header">
      <div className="headerLogoWrap">
        <img
          alt="camera logo"
          src={logo}
          onClick={navigate}
          style={{ cursor: "pointer" }}
        />
      </div>
      {auth && (
        <HeaderIcons
          showNotifications={showNotifications}
          hideNotifications={hideNotifications}
          menuToggle={menuToggle}
          unread={unreadNotifications.length}
        />
      )}
      <Notifications menuToggle={menuToggle} allNotifications={notifications} />
      {isCropping && (
        <div>
          <CropTool image={imageSrc} />
        </div>
      )}{" "}
    </div>
  );
};

export default Header;
