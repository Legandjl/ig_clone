import { useNavigate } from "react-router";

import { Firebase } from "../../firebase/Firebase";

const DeleteMenu = (props) => {
  const { deleteData } = Firebase();

  const nav = useNavigate();
  const handleDelete = async () => {
    try {
      await deleteData(props.identifier, props.type);
      props.cb();
    } catch (e) {
      nav(`/error`, { replace: true });
    }
  };

  return (
    <div data-menu={true} className="deleteMenu">
      <p onClick={handleDelete} data-menu={true}>
        Delete
      </p>
    </div>
  );
};
export default DeleteMenu;
