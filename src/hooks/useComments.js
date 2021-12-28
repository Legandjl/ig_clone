import { useContext, useEffect, useRef, useState } from "react";
import { FirebaseContext } from "../components/firebase/FirebaseContext";
import useMountCheck from "./useMountCheck";

const useComments = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [commentData, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { getComments, submitComment, appUser } = useContext(FirebaseContext);

  const [isMounted] = useMountCheck();

  useEffect(() => {
    const updateComments = async () => {
      const comments = await getComments(props.imageID);
      if (isMounted.current) {
        setComments(() => {
          return comments;
        });
        setLoading(false);
      }
    };
    if (isLoading === true) {
      updateComments();
    }
  }, [getComments, isLoading, isMounted, props.imageID]);

  const handleSubmit = async () => {
    await submitComment(commentText, props.imageID, appUser);
    if (isMounted.current) {
      setLoading(true);
      setCommentText("");
    }
  };

  const handleChange = (e) => {
    const updatedText = e.target.value;
    setCommentText(updatedText);
  };

  const removeComment = (id) => {
    console.log(id);
  };

  const checkIfHome = () => {
    return props.type === "HomePage";
  };

  return {
    checkIfHome,
    removeComment,
    handleChange,
    handleSubmit,
    commentData,
    commentText,
    isLoading,
  };
};
export default useComments;
