import { useState } from "react";
import "./Profile.scss";

type ProfileProps = {
  setViewChange: (view: string) => void;
};

const Profile = ({ setViewChange }: ProfileProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteUser = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="profile-content">
      <div className="profile-top">
        <div className="profile-img">
          <img src="src/assets/profile.png" alt="Profile" />
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
        <button onClick={() => setShowModal(true)}>Delete User</button>
      </div>

      {showModal && (
        <div className="confirm">
          <div className="confirm-content">
            <p>Are you sure you want to delete all data?</p>
            <div className="confirn-btns">
              <button onClick={handleDeleteUser} className="btn">
                Yes
              </button>
              <button onClick={() => setShowModal(false)} className="btn">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
