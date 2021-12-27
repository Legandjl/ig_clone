import { Link } from "react-router-dom";
import { useContext, useState } from "react/cjs/react.development";
import { FileContext } from "../../filepicker/FileContext";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import CropTool from "../../imageCropUtils/CropTool";
import "../styles/Header.css";
import HeaderIcons from "./HeaderIcons";
import logo from "../../../images/logo.png";
import Notifications from "./Notifications";
import { useLocation, useNavigate } from "react-router";

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

  // link needs to be onclick use nav redirect
  // as it doesnt work if not on home page
  const notifications = notificationData.map((item, i) => {
    return (
      <div className="notification" key={i} data-notifications={true}>
        <Link to={`user/${item.sentBy}`} data-notifications={true}>
          {" "}
          <img
            alt={"user icon"}
            style={{ width: 35, height: 35, borderRadius: 50, marginRight: 5 }}
            src={item.photoURL}
            data-notifications={true}
          />{" "}
        </Link>{" "}
        {"likes your "}
        <Link to={`/p/${item.pid}`} data-notifications={true}>
          {" post"}
        </Link>
        <i className="ri-close-circle-line" data-notifications={true}></i>
      </div>
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
