const ProfileData = (props) => {
  return (
    <div className={"profileDataWrap"}>
      {" "}
      <p className={"profileDataP"}>{props.data}</p>
      <p>{props.text}</p>
    </div>
  );
};

export default ProfileData;
