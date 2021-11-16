import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase/FirebaseContext";

const Comments = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [commentData, setComments] = useState([]);
  const { getComments } = useContext(FirebaseContext);
  console.log(commentData);

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

  const comments = commentData.map((el) => {
    return <p>{el.comment}</p>;
  });

  return <div className="commentWrap">{comments}</div>;
};
export default Comments;
