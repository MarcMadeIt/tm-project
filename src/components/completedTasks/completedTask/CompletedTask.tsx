import { useState } from "react";
import {
  MdDelete,
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
  const { toggleTaskCompletion, deleteTask } = useTasks();
  const [confirmRestore, setConfirmRestore] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isoDateTime = new Date(`${date}T${time}`).toISOString();
  const formattedDate = new Date(date).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleRestoreClick = () => {
    setConfirmRestore(true);
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const confirmRestoreTask = () => {
    toggleTaskCompletion(id);
    setConfirmRestore(false);
  };

  const confirmDeleteTask = () => {
    deleteTask(id);
    setConfirmDelete(false);
  };

  const cancelRestore = () => {
    setConfirmRestore(false);
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
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
          <div className="buttons">
            <button className="restore-btn" onClick={handleRestoreClick}>
              <MdRestartAlt size={22} />
              <span>Restore</span>
            </button>
            <button className="delete-btn" onClick={handleDeleteClick}>
              <MdDelete size={22} />
              <span>Delete</span>
            </button>
          </div>
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
        {confirmRestore && (
          <div className="confirm">
            <div className="confirm-content">
              <p>Are you sure you want to restore?</p>
              <div className="confirm-btn">
                <button className="btn" onClick={confirmRestoreTask}>
                  Yes
                </button>
                <button className="btn" onClick={cancelRestore}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
        {confirmDelete && (
          <div className="confirm">
            <div className="confirm-content">
              <p>Are you sure you want to delete?</p>
              <div className="confirm-btn">
                <button className="btn" onClick={confirmDeleteTask}>
                  Yes
                </button>
                <button className="btn" onClick={cancelDelete}>
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
