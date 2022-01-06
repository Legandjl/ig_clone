import { useContext, useState } from "react";
import { FirebaseContext } from "../components/firebase/FirebaseContext";
import useDataLoader from "./useDataLoader";
import useMountCheck from "./useMountCheck";

const useComments = (props) => {
  const [commentText, setCommentText] = useState("");
  const { getComments, submitComment, appUser } = useContext(FirebaseContext);
  const [isMounted] = useMountCheck();

  //   return [loadingComplete, loadingData, data, reloadData];
  const [loadingComplete, isLoading, commentData, refreshComments] =
    useDataLoader(getComments, props.imageID);

  const handleSubmit = async () => {
    await submitComment(commentText, props.imageID, appUser);
    if (isMounted.current) {
      refresh();
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

  const refresh = () => {
    refreshComments();
  };

  const getCommentData = () => {
    if (commentData === null) {
      return [];
    }

    return commentData;
  };

  return {
    checkIfHome,
    removeComment,
    handleChange,
    handleSubmit,
    commentData,
    commentText,
    isLoading,
    refresh,
    getCommentData,
  };
};
export default useComments;
