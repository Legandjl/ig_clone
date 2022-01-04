import { useEffect, useState } from "react/cjs/react.development";

const useShowMenu = () => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick); // return

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  const handleClick = (e) => {
    if (!e.target.dataset.menu) {
      setShowMenu(false);
    }
  };

  const toggleOn = () => {
    setShowMenu(true);
  };

  return [showMenu, toggleOn];
};

export default useShowMenu;
