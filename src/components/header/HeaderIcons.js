import { useLocation } from "react-router";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import FilePicker from "../filepicker/FilePicker";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { Link } from "react-router-dom";
import { useRef } from "react";

const HeaderIcons = (props) => {
  const [heartIcon, setHeartIcon] = useState("ri-heart-line");
  const [logoutIcon, setLogoutIcon] = useState("ri-logout-box-r-line");
  const { signOut } = useContext(FirebaseContext);
  const location = useLocation().pathname;

  const node = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      console.log("clicking");
      if (node.current.contains(e.target)) {
        props.showNotifications();
        return;
      }
      props.hideNotifications();
    };
    document.addEventListener("mousedown", handleClick); // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [props]);

  return (
    <div className="headerIcons">
      {location !== "/home" ? (
        <Link to={"/home"}>
          {" "}
          <i className="ri-home-8-line"></i>
        </Link>
      ) : (
        <i className="ri-home-8-fill"></i>
      )}

      <i
        className={heartIcon}
        onMouseOver={() => setHeartIcon("ri-heart-fill")}
        onMouseLeave={() => setHeartIcon("ri-heart-line")}
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
