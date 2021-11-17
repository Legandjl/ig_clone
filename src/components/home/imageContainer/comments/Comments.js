import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../../firebase/FirebaseContext";

const Comments = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [commentData, setComments] = useState([]);
  const [text, setText] = useState("");
  const { submitComment } = useContext(FirebaseContext);
  const { getComments } = useContext(FirebaseContext);

  useEffect(() => {
    const updateComments = async () => {
      const comments = await getComments(props.id);
      setComments(() => {
        return comments;
      });
    };
    if (isLoading === true) {
      updateComments();
      setLoading(false);
    }
  }, [getComments, isLoading, props.id]);

  const handleSubmit = async () => {
    await submitComment(text, props.id, props.username);
    setLoading(true);
    setText("");
    console.log("submitted!");
  };

  const handleChange = (e) => {
    const updatedText = e.target.value;
    setText((prev) => {
      return updatedText;
    });
  };

  const getDifference = (date2) => {
    const date1 = new Date();
    const Difference_In_Time = date1.getTime() - date2.getTime();
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if (Difference_In_Days < 1) {
      let diff = (date2.getTime() - date1.getTime()) / 1000;
      diff /= 60 * 60;
      if (diff <= 1) {
        return "< 1 hour ago";
      }
      return Math.abs(Math.round(diff)) + " hours ago";
    }
    return Math.round(Difference_In_Days) + " days ago";
  };

  const comments = commentData.map((el) => {
    return (
      <div className="commentInner">
        <p className="commentAuthor">{el.author}</p>
        <p>{el.comment}</p>
        <p>{getDifference(el.timestamp.toDate())}</p>
      </div>
    );
  });

  return (
    <div className="commentArea">
      <div className="commentWrap">
        {comments.length <= 2 ? comments : comments.slice(-2)}
      </div>
      <div className="submitWrap">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={handleChange}
        />
        <button disabled={text.length === 0} onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};
export default Comments;
