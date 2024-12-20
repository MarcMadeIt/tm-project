// Lavet af Marc Møller

import { useEffect, useState } from "react";
import "./Profile.scss";

type ProfileProps = {
  setViewChange: (view: string) => void;
};

const Profile = ({ setViewChange }: ProfileProps) => {
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const handleDeleteUser = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName);
  }, []);

  return (
    <div className="profile-content">
      <div className="profile-top">
        <div className="profile-img">
          <img src="/profile.png" alt="profile picture" />
        </div>
        <h3 aria-label="username">{userName}</h3>
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
