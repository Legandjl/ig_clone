import Loader from "react-loader-spinner";

const SubmitLoader = () => {
  return (
    <div
      style={{
        alignSelf: "center",
        justifySelf: "center",
      }}
    >
      <Loader type="ThreeDots" color="grey" height={30} width={30} />
    </div>
  );
};
export default SubmitLoader;
