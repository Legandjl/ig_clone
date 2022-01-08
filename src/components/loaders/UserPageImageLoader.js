import { useEffect, useState } from "react/cjs/react.development";
import user from "./user.png";

const UserPageImageLoader = () => {
  const [backgroundColor, setbackgroundColor] = useState("#D4D4D4");
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const colors = ["#D5D5D5", "#D7D7D7", "#D8D8D8"];
    setTimeout(() => {
      if (isMounted.current) {
        setbackgroundColor(colors[colorIndex]);
        setColorIndex((prev) => {
          if (prev === 2) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, 900);
    return () => {
      isMounted = false;
    };
  }, [colorIndex]);

  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <img src={user} style={{ opacity: "0" }} alt={"loader"} />
    </div>
  );
};
export default UserPageImageLoader;
