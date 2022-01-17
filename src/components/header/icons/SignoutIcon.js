import { useContext, useState } from "react";

import { FirebaseContext } from "../../firebase/FirebaseContext";

const SignoutIcon = () => {
  const { signOut } = useContext(FirebaseContext);
  const [logoutIcon, setLogoutIcon] = useState("ri-logout-box-r-line");
  return (
    <i
      className={logoutIcon}
      onClick={signOut}
      onMouseOver={() => setLogoutIcon("ri-logout-box-r-fill")}
      onMouseLeave={() => setLogoutIcon("ri-logout-box-r-line")}
    ></i>
  );
};

export default SignoutIcon;
