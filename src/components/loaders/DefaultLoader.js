const DefaultLoader = (props) => {
  return (
    <div
      className={"loader"}
      style={{
        height: "40em",
        width: "40em",
        alignSelf: "center",
        justifySelf: "center",
        display: "grid",
        justifyItems: "center",
        alignItems: "center",
      }}
    ></div>
  );
};
export default DefaultLoader;
