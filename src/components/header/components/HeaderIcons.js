import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import FilePicker from "../../filepicker/FilePicker";
import { FirebaseContext } from "../../firebase/FirebaseContext";
import { Link } from "react-router-dom";
import { useRef } from "react";

const HeaderIcons = (props) => {
  const [heartIcon, setHeartIcon] = useState("ri-heart-line");
  const [logoutIcon, setLogoutIcon] = useState("ri-logout-box-r-line");
  const [homeIcon, setHomeIcon] = useState("ri-home-8-line");
  const [menuOpen, setMenuOpen] = useState(false);
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
        setMenuOpen(false);
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
        className={menuOpen ? "ri-heart-fill" : heartIcon}
        onMouseOver={() => setHeartIcon("ri-heart-fill")}
        onMouseLeave={() => setHeartIcon("ri-heart-line")}
        onClick={() => {
          setMenuOpen((prev) => {
            return !prev;
          });
        }}
        ref={node}
      ></i>
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
