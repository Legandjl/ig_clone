const LoginInput = ({ handleChange, username, isNameAvailable }) => {
  return (
    <>
      <div>
        {" "}
        <input
          type="text"
          style={{ borderRadius: 6 }}
          placeholder="@Username"
          onChange={handleChange}
          value={username}
        />
      </div>
      <div
        style={{
          display: "grid",
          height: "2em",
          alignItems: "center",
        }}
      >
        {" "}
        <p
          style={{
            fontWeight: "initial",
            fontSize: "1em",
            justifySelf: "center",
            color:
              username.length < 3 ? "grey" : isNameAvailable ? "green" : "Red",
          }}
        >
          {username.length < 3
            ? "3-10 characters"
            : !isNameAvailable
            ? "Username already in use"
            : "Username available"}
        </p>
      </div>
    </>
  );
};

export default LoginInput;
