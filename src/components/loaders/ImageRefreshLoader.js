import Loader from "react-loader-spinner";

const ImageRefreshLoader = () => {
  return (
    <div
      style={{
        justifySelf: "center",
        height: "3em",
        display: "grid",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Loader type="ThreeDots" color="black" height={20} width={20} />
    </div>
  );
};
export default ImageRefreshLoader;
