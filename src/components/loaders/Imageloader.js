import Loader from "react-loader-spinner";

const ImageLoader = () => {
  return (
    <div
      style={{
        alignSelf: "center",
      }}
    >
      <Loader type="TailSpin" color="black" height={30} width={30} />
    </div>
  );
};
export default ImageLoader;
