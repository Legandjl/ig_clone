import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react";
import FilePicker from "../../filepicker/FilePicker";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import { Link } from "react-router-dom";
import { useRef } from "react";

const HeaderIcons = (props) => {
  const [hovered, setHovered] = useState(false);

  const [logoutIcon, setLogoutIcon] = useState("ri-logout-box-r-line");
  const [homeIcon, setHomeIcon] = useState("ri-home-8-line");
  const { signOut } = useContext(FirebaseContext);
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

  useEffect(() => {
    if (location !== "/home") {
      setHomeIcon("ri-home-8-line");
    }
  }, [location]);

  return (
    <div className="headerIcons">
      {location !== "/home" ? (
        <Link to={"/home"}>
          {" "}
          <i
            className={homeIcon}
            onMouseOver={() => setHomeIcon("ri-home-8-fill")}
            onMouseLeave={() => setHomeIcon("ri-home-8-line")}
          ></i>
        </Link>
      ) : (
        <i className={"ri-home-8-fill"}></i>
      )}

      <i
        style={{ position: "relative", color: props.unread > 0 && "#FFC90D" }}
        className={
          props.unread > 0 || props.menuToggle || hovered
            ? "ri-lightbulb-fill"
            : "ri-lightbulb-line"
        }
        ref={node}
        onMouseOver={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
      >
        {props.unread > 0 && (
          <p
            style={{
              position: "absolute",
              top: 0,
              fontSize: "0.6em",
              fontWeight: "bold",
              left: "100%",
            }}
          >
            {props.unread <= 9 ? props.unread : "9+"}
          </p>
        )}
      </i>
      <FilePicker />
      <i
        className={logoutIcon}
        onClick={signOut}
        onMouseOver={() => setLogoutIcon("ri-logout-box-r-fill")}
        onMouseLeave={() => setLogoutIcon("ri-logout-box-r-line")}
      ></i>
    </div>
  );
};

export default HeaderIcons;
