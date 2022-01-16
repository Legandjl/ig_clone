import ProfileData from "./ProfileData";

const ProfileDetailsDisplay = (props) => {
  return (
    <>
      <p style={{ alignSelf: "start", fontSize: "2em" }}>
        {props.profile.username}
      </p>
      <div className={"profileDetailsContainer"}>
        <ProfileData text={"Posts"} data={props.postCount} />
        <ProfileData text={"Following"} data={props.following.length} />
        <ProfileData text={"Followers"} data={props.followers.length} />
      </div>
    </>
  );
};

export default ProfileDetailsDisplay;
