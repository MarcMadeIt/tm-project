import "./Profile.scss";

type ProfileProps = {
  setViewChange: (view: string) => void;
};

const Profile = ({ setViewChange }: ProfileProps) => {
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
        <button
          className="btn-filter"
          onClick={() => setViewChange("notifications")}
        >
          Notifications
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
