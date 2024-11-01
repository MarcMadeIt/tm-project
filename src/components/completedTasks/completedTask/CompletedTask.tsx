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

  const handleRestoreClick = () => {
    const newDone = !done;
    setDone(newDone);

    const storedTask = JSON.parse(localStorage.getItem(`task-${id}`) || "{}");
    const updatedTask = { ...storedTask, completed: newDone };
    localStorage.setItem(`task-${id}`, JSON.stringify(updatedTask));
  };

  useEffect(() => {
    const storedTask = localStorage.getItem(`task-${id}`);
    if (!storedTask) {
      const initialTask = {
        title,
        desc,
        date,
        time,
        category,
        completed: true,
      };
      localStorage.setItem(`task-${id}`, JSON.stringify(initialTask));
    }
  }, [id, title, desc, date, time, category, done]);

  return (
    <div className="completed-task">
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
      {/* <div className="completed-task-action">
          <span>
            <MdRestore />
          </span>
          <span>
            <MdEdit />
          </span>
        </div> */}
    </div>
  );
};

export default CompletedTask;
