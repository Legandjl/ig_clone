import oops from "./oops.png";
const ImageLoadError = () => {
  return (
    <div
      style={{
        gridRow: 2,
        display: "grid",
        alignContent: "center",
        justifyContent: "center",
        textAlign: "center",
        gridGap: 5,
        fontWeight: "bold",
      }}
    >
      <img
        src={oops}
        style={{
          height: 60,
          width: 60,
          justifySelf: "center",
          marginBottom: "1em",
        }}
      ></img>
      <p>Something went wrong!</p>
      <p>Please check your connection and load the page again.</p>
    </div>
  );
};

export default ImageLoadError;
