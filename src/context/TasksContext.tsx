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

interface FilterCriteria {
  sortBy: string;
  priority?: string;
  category?: string;
}

interface TasksContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void; // Add deleteTask method
  filterTasks: () => Task[];
  setFilter: (filter: Partial<FilterCriteria>) => void;
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

  const [filter, setFilter] = useState<FilterCriteria>({ sortBy: "Upcoming" });

  const setFilterCriteria = (criteria: Partial<FilterCriteria>) => {
    setFilter((prevFilter) => ({ ...prevFilter, ...criteria }));
  };

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

  // Delete task function
  const deleteTask = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  const filterTasks = (): Task[] => {
    let filteredTasks = [...tasks];

    // Apply sorting based on `sortBy`
    if (filter.sortBy === "Latest") {
      filteredTasks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filter.sortBy === "Upcoming") {
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

    // Apply priority filtering if set
    if (filter.priority) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === filter.priority
      );
    }

    // Apply category filtering if set
    if (filter.category) {
      filteredTasks = filteredTasks.filter(
        (task) => task.category === filter.category
      );
    }

    return filteredTasks;
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        toggleTaskCompletion,
        deleteTask, // Provide the deleteTask function
        filterTasks,
        setFilter: setFilterCriteria,
      }}
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
