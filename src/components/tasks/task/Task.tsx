import { MdCheck, MdEdit } from "react-icons/md";
import "./Task.scss";

const Task = () => {
  return (
    <div className="task">
      <div className="task-card">
        <div className="top">
          <h3>Clean the house</h3>
        </div>
        <div className="bottom">
          <span>12. marts 2025</span>
        </div>
      </div>
      <div className="task-action">
        <span>
          <MdCheck />
        </span>
        <span>
          <MdEdit />
        </span>
      </div>
    </div>
  );
};

export default Task;
