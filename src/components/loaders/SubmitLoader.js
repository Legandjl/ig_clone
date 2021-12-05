import Loader from "react-loader-spinner";

const SubmitLoader = (props) => {
  return (
    <div
      style={{
        alignSelf: "center",
        justifySelf: "center",
      }}
    >
      <Loader type="ThreeDots" color={"gray"} height={30} width={30} />
    </div>
  );
};
export default SubmitLoader;
