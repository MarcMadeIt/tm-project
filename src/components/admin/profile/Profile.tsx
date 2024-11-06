import "./Profile.scss";

const Profile = ({ setViewChange }) => {
  return (
    <div className="profile-content">
      <div className="profile-top">
        <div className="profile-img">
          <img src="src/assets/profile.png" alt="" />
        </div>
        <span>Username</span>
      </div>
      <hr />
      <div className="profile-main">
        <button
          className="btn-filter"
          onClick={() => setViewChange("settings")}
        >
          Settings
        </button>
      </div>
      <hr />
      <div className="profile-bottom">
        <button>Delete User</button>
      </div>
    </div>
  );
};

export default Profile;
