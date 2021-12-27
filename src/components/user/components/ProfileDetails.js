const ProfileDetails = (props) => {
  const { profile } = props;

  return (
    <div className={"profileDisplayInformation"}>
      <p style={{ alignSelf: "start", fontSize: "2em" }}>
        {profile && profile.username}
      </p>
      <p style={{ fontSize: "1.1em" }}>{props.postCount} posts</p>
    </div>
  );
};

export default ProfileDetails;
