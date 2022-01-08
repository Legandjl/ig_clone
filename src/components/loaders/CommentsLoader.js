import Loader from "react-loader-spinner";

const CommentsLoader = (props) => {
  return (
    <li style={{ marginBottom: 0, marginTop: 0 }}>
      <div className={"commentLoaderWrap"}>
        {!props.type && <div className={"headerLoaderImage loader"}></div>}

        <div className={"commentLoaderPost loader"}></div>
        <div className={"commentLoaderTimeStamp loader"}></div>
      </div>
    </li>
  );
};
export default CommentsLoader;
