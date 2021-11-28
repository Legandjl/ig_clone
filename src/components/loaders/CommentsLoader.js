import Loader from "react-loader-spinner";

const CommentsLoader = () => {
  return (
    <div style={{ alignSelf: "center", justifySelf: "center" }}>
      {" "}
      <Loader type="TailSpin" color="black" height={20} width={20} />
    </div>
  );
};
export default CommentsLoader;
