import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const HeaderIcons = () => {
  const [currentLocation, setCurrent] = useState(null);
  const location = useLocation().pathname;
  console.log(location);

  return (
    <div className="headerIcons">
      {location === "/" ? (
        <i className="ri-home-8-line"></i>
      ) : (
        <i className="ri-home-8-fill"></i>
      )}

      <i className="ri-add-box-line"></i>
      <i className="ri-heart-line"></i>
    </div>
  );
};

export default HeaderIcons;
