import { Link } from "react-router-dom";

import "./Header.css";
import HeaderIcons from "./HeaderIcons";
import logo from "./logo.png";

// links to myimages id = user.uid (filter image data by uid)
// sign out
// home

/*
 <button
        onClick={signOut}
        style={{ width: 40, height: 20, justifySelf: "end" }}
      />

      */

const Header = () => {
  return (
    <div className="header">
      <div className="headerLogoWrap">
        <Link to="/home">
          <img alt="camera logo" src={logo} />
        </Link>
      </div>
      <HeaderIcons />
    </div>
  );
};

export default Header;
