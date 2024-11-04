import {
  MdDone,
  MdEdit,
  MdHealthAndSafety,
  MdHome,
  MdOutlineAccessTime,
  MdOutlineFamilyRestroom,
} from "react-icons/md";
import "./Task.scss";
import { useTasks } from "../../../context/TasksContext";

interface TaskProps {
  id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  category: string;
  priority: string;
  completed: boolean;
}

const Task = ({
  id,
  title,
  desc,
  date,
  time,
  category,
  priority,
}: TaskProps) => {
  const { toggleTaskCompletion } = useTasks();

  const isoDateTime = new Date(`${date}T${time}`).toISOString();
  const formattedDate = new Date(date).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="task">
      <div className="task-card">
        <div className="task-top">
          <p className="deadline">
            <MdOutlineAccessTime />
            <time dateTime={isoDateTime}>
              {formattedDate} kl. {time}
            </time>
          </p>
          <p>
            {priority === "Normal" && "🟢 Normal"}
            {priority === "Necessary" && "🟠 Necessary"}
            {priority === "Urgent" && "🔴 Urgent"}
          </p>
        </div>
        <div className="task-bottom">
          <div className="task-content">
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
          <span className="task-cat">
            {category === "Home" && <MdHome />}
            {category === "Family" && <MdOutlineFamilyRestroom />}
            {category === "Health" && <MdHealthAndSafety />}
          </span>
        </div>
      </div>
      <div className="task-action">
        <span onClick={() => toggleTaskCompletion(id)}>
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
