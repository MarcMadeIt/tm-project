import { useState, useEffect } from "react";
import {
  MdDone,
  MdEdit,
  MdHealthAndSafety,
  MdHome,
  MdOutlineAccessTime,
  MdOutlineFamilyRestroom,
} from "react-icons/md";
import "./Task.scss";

interface TaskProps {
  id: string; // Ensure this is included
  title: string;
  desc: string;
  date: string;
  time: string;
  category: string;
  priority: string;
}

const Task = ({ id, title, desc, date, time, category, priority }: TaskProps) => {
  const [done, setDone] = useState(() => {
    const storedTask = JSON.parse(localStorage.getItem(`task-${id}`) || "{}");
    return storedTask.completed || false;
  });

  const isoDateTime = new Date(`${date}T${time}`).toISOString();
  const formattedDate = new Date(date).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleDoneClick = () => {
    const newDone = !done;
    setDone(newDone);

    const storedTask = JSON.parse(localStorage.getItem(`task-${id}`) || "{}");
    const updatedTask = { ...storedTask, completed: newDone };
    localStorage.setItem(`task-${id}`, JSON.stringify(updatedTask));
  };

  useEffect(() => {
    const storedTask = localStorage.getItem(`task-${id}`);
    if (!storedTask) {
      const initialTask = { title, desc, date, time, category, priority, completed: done };
      localStorage.setItem(`task-${id}`, JSON.stringify(initialTask));
    }
  }, [id, title, desc, date, time, category, priority, done]);

  return (
    <div className={`task ${done ? "done" : ""}`}>
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
          <p className="task-cat">
            {category === "Home" && <MdHome />}
            {category === "Family" && <MdOutlineFamilyRestroom />}
            {category === "Health" && <MdHealthAndSafety />}
          </p>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
      <div className="task-action">
        <span onClick={handleDoneClick}>
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
