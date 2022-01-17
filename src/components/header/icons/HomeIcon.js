import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeIcon = (props) => {
  const [homeIcon, setHomeIcon] = useState("ri-home-8-line");

  useEffect(() => {
    if (props.location !== "/home") {
      setHomeIcon("ri-home-8-line");
    }
  }, [props.location]);

  return props.location !== "/home" ? (
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
  );
};

export default HomeIcon;
