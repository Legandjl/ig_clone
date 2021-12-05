import Loader from "react-loader-spinner";

const LoginLoader = () => {
  return (
    <div style={{ width: "100%", display: "grid", justifyItems: "center" }}>
      <Loader type="ThreeDots" color="black" height={20} width={20} />
    </div>
  );
};
export default LoginLoader;
