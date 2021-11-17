import "../Home.css";
import Comments from "./comments/Comments";

import ImageHeader from "./ImageHeader";
const ImageContainer = (props) => {
  return (
    <div className="imageContainerHome">
      <ImageHeader username={props.username} />
      <img alt={props.name} id={props.id} src={props.src} />
      <Comments id={props.id} username={props.username} />
    </div>
  );
};

export default ImageContainer;
