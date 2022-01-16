import { useContext } from "react";
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

// notifications need to be refreshed when opening and closing

const Header = () => {
  const { auth } = useContext(FirebaseContext);
  const { isCropping, imageSrc } = useContext(FileContext);

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

  const handleRedirect = (loc) => {
    console.log(loc);
    nav(loc, { replace: "true" });
    hideNotifications();
  };

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
          unread={notificationData.length}
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
