// Lavet af Marc Møller

import { useState } from "react";
import { MdClose } from "react-icons/md";
import "./EditTask.scss";

type Task = {
  id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  category: string;
  priority: string;
  completed: boolean;
};

type EditTaskProps = {
  taskId: string;
  closeEdit: () => void;
};

const EditTask = ({ taskId, closeEdit }: EditTaskProps) => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const task = storedTasks.find((t: Task) => t.id === taskId) || {};

  const [title, setTitle] = useState(task.title || "");
  const [desc, setDesc] = useState(task.desc || "");
  const [date, setDate] = useState(task.date || "");
  const [time, setTime] = useState(task.time || "");
  const [category, setCategory] = useState(task.category || "");
  const [priority, setPriority] = useState(task.priority || "Normal");
  const [titleCharCount, setTitleCharCount] = useState(title.length);
  const [descCharCount, setDescCharCount] = useState(desc.length);
  const maxCharsTitle = 25;
  const maxCharsDesc = 80;

  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      desc,
      date,
      time,
      category,
      priority,
    };
    const updatedTasks = storedTasks.map((t: Task) =>
      t.id === taskId ? updatedTask : t
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    closeEdit();
    window.location.reload();
  };

  return (
    <div className="edit-modal">
      <form onSubmit={handleUpdateTask} className="edit-form">
        <button type="button" className="edit-close" onClick={closeEdit}>
          <MdClose size={35} />
        </button>
        <h3>Edit Task</h3>
        <div className="edit-item">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="inp"
            placeholder="e.g., Clean the house"
            value={title}
            onChange={(e) => {
              const newTitle = e.target.value;
              if (newTitle.length <= maxCharsTitle) {
                setTitle(newTitle);
                setTitleCharCount(newTitle.length);
              }
            }}
            required
            maxLength={maxCharsTitle}
          />
          <div className="indicator">
            {titleCharCount}/{maxCharsTitle}
          </div>
        </div>
        <div className="edit-item">
          <label htmlFor="desc">Description</label>
          <input
            id="desc"
            type="text"
            className="inp"
            placeholder="e.g., Clean the hall and toilet"
            value={desc}
            onChange={(e) => {
              const newDesc = e.target.value;
              if (newDesc.length <= maxCharsDesc) {
                setDesc(newDesc);
                setDescCharCount(newDesc.length);
              }
            }}
            maxLength={maxCharsDesc}
          />
          <div className="indicator">
            {descCharCount}/{maxCharsDesc}
          </div>
        </div>
        <div className="edit-item">
          <label htmlFor="deadline">Deadline</label>
          <div className="deadline">
            <input
              id="deadline"
              type="date"
              className="inp"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              className="inp"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-item">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option disabled value="">
              Choose Category
            </option>
            <option value="Home">Home</option>
            <option value="Family">Family</option>
            <option value="Health">Health</option>
          </select>
        </div>
        <div className="edit-item">
          <label>Priority</label>
          <div className="edit-radio-content">
            <div className="edit-radio-item">
              <label>Normal</label>
              <input
                type="radio"
                value="Normal"
                name="priority"
                checked={priority === "Normal"}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
            <div className="edit-radio-item">
              <label>Necessary</label>
              <input
                type="radio"
                value="Necessary"
                name="priority"
                checked={priority === "Necessary"}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
            <div className="edit-radio-item">
              <label>Urgent</label>
              <input
                type="radio"
                value="Urgent"
                name="priority"
                checked={priority === "Urgent"}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
