import { useLocation } from "react-router";
import { useEffect } from "react";
import FilePicker from "../../filepicker/FilePicker";
import { useRef } from "react";
import NotificationIcon from "../icons/NotificationIcon";
import HomeIcon from "../icons/HomeIcon";
import SignoutIcon from "../icons/SignoutIcon";

const HeaderIcons = (props) => {
  const location = useLocation().pathname;
  const node = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (node.current.contains(e.target)) {
        props.showNotifications();
        return;
      }

      if (!e.target.dataset.notifications) {
        props.hideNotifications();
      }
    };
    document.addEventListener("mousedown", handleClick); // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [props]);

  return (
    <div className="headerIcons">
      <HomeIcon location={location} />
      <NotificationIcon
        unread={props.unread}
        menuToggle={props.menuToggle}
        node={node}
      />
      <FilePicker />
      <SignoutIcon />
    </div>
  );
};

export default HeaderIcons;
