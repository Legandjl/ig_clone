const HomeImageToggle = (props) => {
  return (
    <div className={"imagesToggle"}>
      <p
        onClick={() => {
          props.refreshSelection(false);
        }}
        style={{
          paddingRight: 6,
          color: props.followToggled ? "gray" : "black",
        }}
      >
        All
      </p>{" "}
      <p
        onClick={() => {
          props.refreshSelection(true);
        }}
        style={{
          borderLeft: "solid 1px",
          paddingLeft: 6,
          color: !props.followToggled ? "grey" : "black",
        }}
      >
        Following
      </p>
    </div>
  );
};

export default HomeImageToggle;
