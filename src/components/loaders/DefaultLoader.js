import { useEffect, useState } from "react/cjs/react.development";

const DefaultLoader = (props) => {
  const [backgroundColor, setbackgroundColor] = useState("#D4D4D4");
  const [colorIndex, setColorIndex] = useState(0);

  //ched=cked for leak

  useEffect(() => {
    let isMounted = true;
    const colors = ["#D5D5D5", "#D7D7D7", "#D8D8D8"];
    setTimeout(() => {
      if (isMounted) {
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
    <div
      style={{
        height: "40em",
        width: "40em",
        alignSelf: "center",
        justifySelf: "center",
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
        transition: "ease-in-out 0.9s",
      }}
    ></div>
  );
};
export default DefaultLoader;
