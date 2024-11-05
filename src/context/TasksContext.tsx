import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Task {
  id: string;
  title: string;
  desc: string;
  date: string;
  time: string;
  category: string;
  priority: string;
  completed: boolean;
  createdAt: string;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  filterTasks: () => Task[];
  setFilter: (filter: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    const initialTasks = savedTasks ? JSON.parse(savedTasks) : [];
    return initialTasks.map((task: Task) => ({
      ...task,
      createdAt: task.createdAt || new Date().toISOString(),
    }));
  });

  const [filter, setFilter] = useState<string>("Latest");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    const taskWithTimestamp = {
      ...newTask,
      createdAt: new Date().toISOString(),
    };
    setTasks((prevTasks) => [...prevTasks, taskWithTimestamp]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filterTasks = (): Task[] => {
    switch (filter) {
      case "Latest":
        return tasks
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      case "Upcoming":
        return tasks
          .slice()
          .filter(
            (task) =>
              new Date(`${task.date}T${task.time}`).getTime() > Date.now()
          ) // Only upcoming tasks
          .sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
            const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();
            return dateTimeA - dateTimeB;
          });
      case "Normal":
        return tasks.filter((task) => task.priority === "Normal");
      case "Necessary":
        return tasks.filter((task) => task.priority === "Necessary");
      case "Urgent":
        return tasks.filter((task) => task.priority === "Urgent");
      case "Home":
        return tasks.filter((task) => task.category === "Home");
      case "Family":
        return tasks.filter((task) => task.category === "Family");
      case "Health":
        return tasks.filter((task) => task.category === "Health");
      default:
        return tasks;
    }
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, toggleTaskCompletion, filterTasks, setFilter }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
