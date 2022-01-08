import "./styles/loaders.css";

const ProfileDisplayLoader = () => {
  return (
    <div className="profileLoader">
      <div className="imageLoader loader"></div>
      <div className="detailsLoader">
        <div className="usernameLoader loader"></div>
        <div className="userDataLoader loader"></div>
      </div>
    </div>
  );
};

export default ProfileDisplayLoader;
