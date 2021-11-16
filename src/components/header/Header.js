import { useContext } from "react";
import { FirebaseContext } from "../firebase/FirebaseContext";
import "./Header.css";
import HeaderIcons from "./HeaderIcons";
import logo from "./logo.png";

// links to myimages id = user.uid (filter image data by uid)
// sign out
// home

const Header = () => {
  const { signOut } = useContext(FirebaseContext);
  return (
    <div className="header">
      <div className="headerLogoWrap">
        <img alt="camera logo" src={logo} />
      </div>
      <HeaderIcons />
      <button
        onClick={signOut}
        style={{ width: 40, height: 20, justifySelf: "end" }}
      />
    </div>
  );
};

export default Header;
