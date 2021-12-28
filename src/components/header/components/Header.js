import { useContext, useState } from "react/cjs/react.development";
import { FileContext } from "../../filepicker/FileContext";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import CropTool from "../../imageCropUtils/CropTool";
import "../styles/Header.css";
import HeaderIcons from "./HeaderIcons";
import logo from "../../../images/logo.png";
import Notifications from "./Notifications";
import { useLocation, useNavigate } from "react-router";
import NotificationElement from "./NotificationElement";

// notifications need to be refreshed when opening and closing

const Header = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const { notificationData, auth } = useContext(FirebaseContext);
  const { isCropping, imageSrc } = useContext(FileContext);

  const nav = useNavigate();
  const location = useLocation();

  const showNotifications = () => {
    setMenuToggle((prev) => {
      return !prev;
    });
  };

  const hideNotifications = () => {
    setMenuToggle(false);
  };

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
        sentBy={item.sentBy}
        elementID={i}
        photoURL={item.photoURL}
        pid={item.pid}
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
