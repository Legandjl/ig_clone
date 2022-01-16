import { useEffect } from "react";
import useDataLoader from "../../../hooks/useDataLoader";
import useImageLoader from "../../../hooks/useImageLoader";
import { Firebase } from "../../firebase/Firebase";
import Notification from "./Notification";

const NotificationElement = (props) => {
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
  };

  return (
    !loadingData && (
      <Notification
        deleteNotification={deleteNotification}
        imageError={imageError}
        notification={props.notification}
        elementID={props.elementID}
        data={data}
        imageLoaded={imageLoaded}
        redirect={props.redirect}
      />
    )
  );
};

export default NotificationElement;
