import { useEffect, useState } from "react/cjs/react.development";

const DefaultLoader = (props) => {
  const [backgroundColor, setbackgroundColor] = useState("#D3D3D3");

  useEffect(() => {
    setTimeout(() => {
      setbackgroundColor("white");
    }, 280);
  }, []);
  return (
    <div
      style={{
        height: "40em",
        width: "40em",
        alignSelf: "center",
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        transition: "ease-in 0.2s",
      }}
    ></div>
  );
};
export default DefaultLoader;
