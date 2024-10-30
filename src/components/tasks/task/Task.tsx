// Task.tsx
import { MdDone, MdEdit } from "react-icons/md";
import "./Task.scss";

interface TaskProps {
  title: string;
  description: string;
  deadline: string;
  category: string;
  priority: string;
}

const Task = ({
  title,
  description,
  deadline,
  category,
  priority,
}: TaskProps) => {
  return (
    <div className="task">
      <div className="task-card">
        <div className="task-left">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="task-right">
          <p>{deadline}</p>
          <p>{category}</p>
          <p>{priority}</p>
        </div>
      </div>
      <div className="task-action">
        <span>
          <MdDone />
        </span>
        <span>
          <MdEdit />
        </span>
      </div>
    </div>
  );
};

export default Task;
