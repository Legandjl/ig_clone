import { useContext } from "react/cjs/react.development";
import { FileContext } from "../../filepicker/FileContext";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import CropTool from "../../imageCropUtils/CropTool";
import "../styles/Header.css";
import HeaderIcons from "./HeaderIcons";
import logo from "../../../images/logo.png";
import Notifications from "./Notifications";
import { useLocation, useNavigate } from "react-router";
import NotificationElement from "./NotificationElement";
import { useEffect } from "react";
import useMountCheck from "../../../hooks/useMountCheck";
import { Firebase } from "../../firebase/Firebase";
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

  const notifications = notificationData.map((item, i) => {
    return (
      <NotificationElement
        elementID={i}
        refreshNotifications={refreshNotifications}
        notification={item}
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
