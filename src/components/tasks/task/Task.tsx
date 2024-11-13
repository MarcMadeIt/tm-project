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
import EditTask from "../../editTask/EditTask";
import { useState } from "react";

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
  const [isEditing, setIsEditing] = useState(false);

  const isoDateTime = new Date(`${date}T${time}`).toISOString();
  const formattedDate = new Date(date).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="task">
        <div className="task-card">
          <div className="task-top">
            <p className="deadline">
              <MdOutlineAccessTime />
              <time dateTime={isoDateTime}>
                {formattedDate} kl. {time}
              </time>
            </p>
            <p className="task-prio">
              {priority === "Normal" && (
                <>
                  <img src="src/assets/Normal.png" alt="Normal Priority" />{" "}
                  Normal
                </>
              )}
              {priority === "Necessary" && (
                <>
                  <img
                    src="src/assets/Necessary.png"
                    alt="Necessary Priority"
                  />{" "}
                  Necessary
                </>
              )}
              {priority === "Urgent" && (
                <>
                  <img src="src/assets/Urgent.png" alt="Urgent Priority" />{" "}
                  Urgent
                </>
              )}
            </p>
          </div>
          <div className="task-bottom">
            <div className="task-content">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
            <span role="Category icons" className="task-cat">
              {category === "Home" && <MdHome />}
              {category === "Family" && <MdOutlineFamilyRestroom />}
              {category === "Health" && <MdHealthAndSafety />}
            </span>
          </div>
        </div>
        <div className="task-action">
          <span
            role="Button"
            aria-label="Done button"
            onClick={() => toggleTaskCompletion(id)}
          >
            <MdDone />
          </span>
          <span
            role="Button"
            aria-label="Edit button"
            onClick={() => setIsEditing(true)}
          >
            <MdEdit />
          </span>
        </div>
      </div>
      {isEditing && (
        <EditTask taskId={id} closeEdit={() => setIsEditing(false)} />
      )}
    </>
  );
};

export default Task;
