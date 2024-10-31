import { useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import { MdClose } from "react-icons/md";
import { useTasks } from "../../context/TasksContext";
import "./CreateTask.scss";

const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];
  const formattedTime = currentDate
    .toTimeString()
    .split(":")
    .slice(0, 2)
    .join(":");

  const [date, setDate] = useState(formattedDate);
  const [time, setTime] = useState(formattedTime);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Normal");

  const { addTask } = useTasks();

  const handleCreate = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a new task with a unique ID
    const newTask = {
      id: uuidv4(), // Generate a unique ID
      title,
      desc,
      date,
      time,
      category,
      priority,
      completed: false,
    };
    
    addTask(newTask);

    setTitle("");
    setDesc("");
    setDate(formattedDate);
    setTime(formattedTime);
    setCategory("");
    setPriority("Normal");
    setOpen(false);
  };

  return (
    <div className="create-task">
      <button onClick={handleCreate} className="create-btn btn">
        New task
      </button>
      {open && (
        <div className="create-modal">
          <form onSubmit={handleAddTask}>
            <button
              type="button"
              className="create-close"
              onClick={handleClose}
            >
              <MdClose size={35} />
            </button>
            <h3>Create new Task</h3>
            <div className="create-item">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="inp"
                placeholder="e.g., Clean the house"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="create-item">
              <label htmlFor="desc">Description</label>
              <input
                id="desc"
                type="text"
                className="inp"
                placeholder="e.g., Clean the hall and toilet"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="create-item">
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
            <div className="create-item">
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
            <div className="create-item">
              <label>Priority</label>
              <div className="create-radio-content">
                <div className="create-radio-item">
                  <label>Normal</label>
                  <input
                    type="radio"
                    value="Normal"
                    name="priority"
                    checked={priority === "Normal"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
                <div className="create-radio-item">
                  <label>Necessary</label>
                  <input
                    type="radio"
                    value="Necessary"
                    name="priority"
                    checked={priority === "Necessary"}
                    onChange={(e) => setPriority(e.target.value)}
                  />
                </div>
                <div className="create-radio-item">
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
              Add Task
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
