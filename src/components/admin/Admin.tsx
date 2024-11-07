import { useState } from "react";
import { MdPersonOutline } from "react-icons/md";
import "./admin.scss";
import Profile from "./profile/Profile";
import Settings from "./settings/Settings";
import Notifications from "./notifications/Notifications";

const Admin = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [viewChange, setViewChange] = useState("profile");

  const toggleAdmin = () => {
    setAdminOpen(!adminOpen);
  };

  return (
    <div>
      <div className="admin">
        <button aria-label="Profile button" className="admin-open" onClick={toggleAdmin}>
          <MdPersonOutline size={38} />
        </button>
        {adminOpen && (
          <div className="admin-content">
            {viewChange === "profile" && (
              <Profile setViewChange={setViewChange} />
            )}
            {viewChange === "settings" && (
              <Settings setViewChange={setViewChange} />
            )}
            {viewChange === "notifications" && (
              <Notifications setViewChange={setViewChange} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
