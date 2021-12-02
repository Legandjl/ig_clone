const LikeCounter = ({ likeCount, type }) => {
  return (
    <p
      style={{
        fontWeight: "bold",
        fontSize: "0.5em",
      }}
    >
      {type === "ImagePage" && likeCount === 0
        ? "Be the first to like this"
        : likeCount === 1
        ? likeCount + " like"
        : likeCount + " likes"}
    </p>
  );
};

export default LikeCounter;
