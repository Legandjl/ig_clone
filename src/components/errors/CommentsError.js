const CommentsError = (props) => {
  return (
    <div
      style={{
        alignSelf: "center",
        justifySelf: "center",
        display: "grid",
        justifyItems: "center",
        fontSize: "0.9em",
        gridGap: 10,
        paddingBottom: 30,
      }}
    >
      {" "}
      <i
        style={{ fontSize: "1.8em" }}
        onClick={() => {
          props.handleError();
        }}
        class="ri-refresh-line"
      ></i>
      <p>Comments failed to load</p>
    </div>
  );
};

export default CommentsError;
