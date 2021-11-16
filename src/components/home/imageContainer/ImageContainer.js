import FilePicker from "../../filepicker/FilePicker";
import "../Home.css";
import Comments from "./Comments";
const ImageContainer = (props) => {
  return (
    <div className="imageContainerHome">
      <img alt={props.name} id={props.id} src={props.src} />
      <FilePicker />
      <Comments id={props.id} />
      <div className="addCommentBox"></div>
    </div>
  );
};

export default ImageContainer;
