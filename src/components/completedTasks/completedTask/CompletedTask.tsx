import { useEffect } from "react";
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
  completed: boolean;
}

const CompletedTask = ({
  id,
  title,
  desc,
  date,
  time,
  category,
  completed,
}: TaskProps) => {
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
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      console.log("Task not found"); // Debug log
    }
  };

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const taskExists = tasks.some((task: { id: string }) => task.id === id);

    if (!taskExists) {
      const newTask = { id, title, desc, date, time, category, completed };
      tasks.push(newTask);
      console.log("Adding new task to localStorage:", newTask); // Debug log
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      console.log("Task already exists in localStorage"); // Debug log
    }
  }, [id, title, desc, date, time, category, completed]);

  return (
    <div className={`completed-task ${completed ? "completed" : ""}`}>
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
