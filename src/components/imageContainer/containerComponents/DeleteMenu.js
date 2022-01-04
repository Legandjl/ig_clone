import { useNavigate } from "react-router";

import { Firebase } from "../../firebase/Firebase";

const DeleteMenu = (props) => {
  const { deleteImage } = Firebase();

  const nav = useNavigate();
  const handleDelete = async () => {
    try {
      await deleteImage(props.identifier);
      nav(`/home`, { replace: true });
    } catch (e) {
      nav(`/error`, { replace: true });
    }
  };

  return (
    <div data-menu={true} className="deleteMenu">
      <p onClick={handleDelete} data-menu={true} style={{ fontSize: "0.6em" }}>
        Delete
      </p>
    </div>
  );
};
export default DeleteMenu;
