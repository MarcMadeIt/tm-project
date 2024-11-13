import { useState, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdClose } from "react-icons/md";
import { useTasks } from "../../context/TasksContext";
import "./CreateTask.scss";

const CreateTask = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Set the initial date and time to 10 minutes in the future
  const tenMinutesLater = new Date(Date.now() + 10 * 60000);
  const formattedDate = tenMinutesLater.toISOString().split("T")[0];
  const formattedTime = tenMinutesLater.toTimeString().split(":").slice(0, 2).join(":");

  const [date, setDate] = useState(formattedDate);
  const [time, setTime] = useState(formattedTime);
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [descCharCount, setDescCharCount] = useState(0);
  const maxCharsTitle = 25;
  const maxCharsDesc = 80;

  const { addTask } = useTasks();

  const handleCreate = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentDateTime = new Date();
    const minDeadline = new Date(currentDateTime.getTime() + 9 * 60000); // current time + 9 minutes

    const selectedDeadline = new Date(`${date}T${time}`);

    if (selectedDeadline <= minDeadline) {
      alert("The deadline must be at least 10 minutes from now.");
      return;
    }

    const newTask = {
      id: uuidv4(),
      title,
      desc,
      date,
      time,
      category,
      priority,
      completed: false,
      createdAt: currentDateTime.toISOString(),
    };

    addTask(newTask);

    // Reset form fields
    setTitle("");
    setDesc("");
    setDate(formattedDate);
    setTime(formattedTime);
    setCategory("");
    setPriority("Normal");
    setTitleCharCount(0);
    setDescCharCount(0);
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
            <div className="create-item">
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
