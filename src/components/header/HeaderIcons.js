import { useLocation } from "react-router";
import { useContext } from "react/cjs/react.development";
import { FirebaseContext } from "../firebase/FirebaseContext";

const HeaderIcons = (props) => {
  const { signOut } = useContext(FirebaseContext);

  const location = useLocation().pathname;

  return (
    <div className="headerIcons">
      {location === "/" ? (
        <i className="ri-home-8-line"></i>
      ) : (
        <i className="ri-home-8-fill"></i>
      )}

      <i className="ri-add-box-line"></i>
      <i className="ri-heart-line"></i>
      <i className="ri-logout-box-r-line" onClick={signOut}></i>
    </div>
  );
};

export default HeaderIcons;
