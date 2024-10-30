import { MdDone, MdEdit, MdOutlineAccessTime } from "react-icons/md";
import "./Task.scss";

interface TaskProps {
  title: string;
  desc: string;
  date: string;
  time: string;
  category: string;
  priority: string;
}

const Task = ({ title, desc, date, time, category, priority }: TaskProps) => {
  const isoDateTime = new Date(`${date}T${time}`).toISOString();

  const formattedDate = new Date(date).toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="task">
      <div className="task-card">
        <div className="task-left">
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
        <div className="task-right">
          <p className="deadline">
            <MdOutlineAccessTime />
            <time dateTime={isoDateTime}>
              {formattedDate} kl. {time}
            </time>
          </p>
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
