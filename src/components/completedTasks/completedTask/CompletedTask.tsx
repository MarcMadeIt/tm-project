import { useEffect, useState } from "react";
import "./CompletedTask.scss";
import {
  MdHealthAndSafety,
  MdHome,
  MdOutlineAccessTime,
  MdOutlineFamilyRestroom,
  MdRestore,
} from "react-icons/md";

interface TaskProps {
  id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  category: string;
}

const CompletedTask = ({
  id,
  title,
  desc,
  date,
  time,
  category,
}: TaskProps) => {
  const [done, setDone] = useState(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const task = tasks.find((task: { id: string }) => task.id === id);
    return task ? task.completed : false;
  });

  const isoDateTime = new Date(`${date}T${time}`).toISOString();
  const formattedDate = new Date(date).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const handleRestoreClick = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const taskIndex = tasks.findIndex((task: { id: string }) => task.id === id);

    if (taskIndex !== -1) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      setDone(tasks[taskIndex].completed);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  };

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (!tasks.some((task: { id: string }) => task.id === id)) {
      const newTask = { id, title, desc, date, time, category, completed: done };
      tasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [id, title, desc, date, time, category, done]);

  return (
    <div className={`completed-task ${done ? "completed" : ""}`}>
      <div className="completed-task-card">
        <div className="completed-task-top">
          <p className="deadline">
            <MdOutlineAccessTime />
            <time dateTime={isoDateTime}>
              {formattedDate} kl. {time}
            </time>
          </p>
        </div>
        <div className="completed-task-bottom">
          <p className="completed-task-cat">
            {category === "Home" && <MdHome />}
            {category === "Family" && <MdOutlineFamilyRestroom />}
            {category === "Health" && <MdHealthAndSafety />}
          </p>
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>

        <span onClick={handleRestoreClick}>
          <MdRestore />
        </span>
      </div>
    </div>
  );
};

export default CompletedTask;
