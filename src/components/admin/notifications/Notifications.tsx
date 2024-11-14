// Lavet af Marc Møller

import { MdArrowBack } from "react-icons/md";

type NotificationsProps = {
  setViewChange: (view: string) => void;
};

const Notifications = ({ setViewChange }: NotificationsProps) => {
  return (
    <div className="notification-content">
      <button onClick={() => setViewChange("profile")}>
        <MdArrowBack size={28} />
      </button>
    </div>
  );
};

export default Notifications;
