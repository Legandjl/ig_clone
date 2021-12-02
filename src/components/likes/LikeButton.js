const LikeButton = (props) => {
  return (
    <div>
      {props.postLiked ? (
        <i
          style={{ color: "red" }}
          className="ri-heart-fill"
          onClick={props.handleLike}
        ></i>
      ) : (
        <i onClick={props.handleLike} className="ri-heart-line"></i>
      )}
    </div>
  );
};

export default LikeButton;
