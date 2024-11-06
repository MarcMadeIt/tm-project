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
    let filteredTasks = [...tasks];

    if (filter === "Latest") {
      filteredTasks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filter === "Upcoming") {
      filteredTasks = filteredTasks
        .filter(
          (task) => new Date(`${task.date}T${task.time}`).getTime() > Date.now()
        )
        .sort((a, b) => {
          const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
          const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();
          return dateTimeA - dateTimeB;
        });
    }

    if (filter.startsWith("Priority: ")) {
      const priorityFilter = filter.replace("Priority: ", "");
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === priorityFilter
      );
    }

    if (filter.startsWith("Category: ")) {
      const categoryFilter = filter.replace("Category: ", "");
      filteredTasks = filteredTasks.filter(
        (task) => task.category === categoryFilter
      );
    }

    return filteredTasks;
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
