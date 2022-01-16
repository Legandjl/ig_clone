import { useEffect, useRef, useState } from "react";

const useShowMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const handleClick = (e) => {
    if (!e.target.dataset.menu && e.target !== menuRef.current) {
      setShowMenu(false);
    }
  };

  const toggleOn = (e) => {
    setShowMenu(true);
    menuRef.current = e.target;
  };

  const toggleOff = () => {
    setShowMenu(false);
  };

  return [showMenu, toggleOn, toggleOff];
};

export default useShowMenu;
