import { useEffect, useState } from "react/cjs/react.development";
import useDataLoader from "../../../hooks/useDataLoader";
import useImageLoader from "../../../hooks/useImageLoader";
import { Firebase } from "../../firebase/Firebase";
import FollowNotification from "./FollowNotification";
import LikeNotification from "./LikeNotification";

// link needs to be onclick use nav redirect
// as it doesnt work if not on home page
// needs image loader for notification

const NotificationElement = (props) => {
  const [show, setShow] = useState(true);
  const [imageLoaded, loadImage, imageError] = useImageLoader();
  const { getUserProfile, deleteData } = Firebase();
  const [loadingComplete, loadingData, data, reloadData] = useDataLoader(
    getUserProfile,
    props.notification.sentBy
  );

  useEffect(() => {
    if (!imageLoaded && data) {
      loadImage(data.profilePictureUrl);
    }
  }, [data, imageLoaded, loadImage, loadingData]);

  const deleteNotification = async () => {
    await deleteData(props.notification.identifier, "notifications");
    props.refreshNotifications();
    setShow(false);
  };

  // if type == "like" return <LikeNotification /> else return <FollowNotification />

  return props.notification.type === "like" ? (
    !loadingData && (
      <LikeNotification
        deleteNotification={deleteNotification}
        imageError={imageError}
        notification={props.notification}
        elementID={props.elementID}
        data={data}
        show={show}
        imageLoaded={imageLoaded}
      />
    )
  ) : (
    <FollowNotification
      deleteNotification={deleteNotification}
      imageError={imageError}
      notification={props.notification}
      elementID={props.elementID}
      data={data}
      show={show}
      imageLoaded={imageLoaded}
    />
  );
};

export default NotificationElement;
