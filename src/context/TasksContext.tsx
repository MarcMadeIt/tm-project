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
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  filterTask: () => Task [];
  setFilter: (filter:string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Initialize tasks from localStorage
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState <string> ("Latest");

  useEffect(() => {
    // Sync tasks to localStorage whenever they change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filterTasks = (filter: string): Task[] => {
    switch (filter) {
    case"Latest":
    return tasks.slice().sort((a, b) =>newDate(b.date).getTime() - newDate(a.date).getTime());
    case"Upcoming":
    return tasks.slice().sort((a, b) =>newDate(a.date).getTime() - newDate(b.date).getTime());
    case"Priority: Urgent":
    return tasks.filter((task) => task.priority === "Urgent");
    case"Priority: Necessary":
    return tasks.filter((task) => task.priority === "Necessary");
    case"Priority: Normal":
    return tasks.filter((task) => task.priority === "Normal");
    case"Category: Home":
    return tasks.filter((task) => task.category === "Home");
    case"Category: Family":
    return tasks.filter((task) => task.category === "Family");
    case"Category: Health":
    return tasks.filter((task) => task.category === "Health");
    default:
    return tasks;
        }
      };

  return (
    <TasksContext.Provider value={{ tasks, addTask, toggleTaskCompletion, filterTasks }}>
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
