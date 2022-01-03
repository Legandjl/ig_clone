import { useNavigate } from "react-router";
import { useContext } from "react/cjs/react.development";
import { Firebase } from "../../firebase/Firebase";
import { FirebaseContext } from "../../firebase/FirebaseContext";

const DeleteMenu = (props) => {
  const { deleteImage } = Firebase();
  const { appUser } = useContext(FirebaseContext);
  const nav = useNavigate();
  const handleDelete = async () => {
    await deleteImage(props.identifier);
    nav(`/user/${appUser.uid}`, { replace: true });
  };
  // nav to deletion confirm page, then back to home
  return (
    <div data-menu={true} className="deleteMenu">
      <p onClick={handleDelete} data-menu={true} style={{ fontSize: "0.6em" }}>
        Delete
      </p>
    </div>
  );
};
export default DeleteMenu;
