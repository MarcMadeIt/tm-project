import { useState } from "react";
import {
  MdHealthAndSafety,
  MdHome,
  MdOutlineAccessTime,
  MdOutlineFamilyRestroom,
  MdRestartAlt,
} from "react-icons/md";
import "./CompletedTask.scss";
import { useTasks } from "../../../context/TasksContext";

interface TaskProps {
  id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  category: string;
  completed: boolean;
}

const CompletedTask = ({
  id,
  title,
  desc,
  date,
  time,
  category,
}: TaskProps) => {
  const { toggleTaskCompletion } = useTasks();
  const [Confirm, setConfirm] = useState(false);

  const isoDateTime = new Date(`${date}T${time}`).toISOString();
  const formattedDate = new Date(date).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleRestoreClick = () => {
    setConfirm(true);
  };

  const confirmRestore = () => {
    toggleTaskCompletion(id);
    setConfirm(false);
  };

  const cancelRestore = () => {
    setConfirm(false);
  };

  return (
    <div className="completed-task">
      <div className="completed-card">
        <div className="completed-top">
          <p className="deadline">
            <MdOutlineAccessTime />
            <time dateTime={isoDateTime}>
              {formattedDate} kl. {time}
            </time>
          </p>
          <button className="restore-btn" onClick={handleRestoreClick}>
            <MdRestartAlt size={22} />
            <span>Restore</span>
          </button>
        </div>
        <div className="completed-bottom">
          <h3>{title}</h3>
          <p>{desc}</p>
          <span className="completed-cat">
            {category === "Home" && <MdHome />}
            {category === "Family" && <MdOutlineFamilyRestroom />}
            {category === "Health" && <MdHealthAndSafety />}
          </span>
        </div>
        {Confirm && (
          <div className="confirm">
            <div className="confirm-content">
              <p>Are you sure you want to restore?</p>
              <div className="confirm-btn">
                <button className="btn " onClick={confirmRestore}>
                  Yes
                </button>
                <button className="btn " onClick={cancelRestore}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedTask;
