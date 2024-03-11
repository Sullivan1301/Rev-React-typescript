import { useState } from "react";
import { nanoid } from "nanoid";
import "./TaskManager.css";

// Modèle de tâche
interface Task {
  id: string;
  title: string;
}

// Hook personnalisé pour gérer l'état des tâches
const useTaskManager = () => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  // Supprimer une tâche de la liste
  const completeTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Mettre à jour une tâche dans la liste
  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, ...taskUpdate } : task
    );
    setTasks(newTasks);
  };

  // Ajouter une nouvelle tâche
  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  // Gérer la recherche de tâches
  const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(ev.target.value);
  };

  // Filtrer les tâches en fonction du mot-clé de recherche
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    title,
    setTitle,
    searchKeyword,
    setSearchKeyword,
    tasks,
    completeTask,
    updateTask,
    addTask,
    handleSearch,
    filteredTasks,
  };
};

// Composant TaskManager
export const TaskManager = () => {
  const {
    title,
    setTitle,
    searchKeyword,
    setSearchKeyword,
    tasks,
    completeTask,
    updateTask,
    addTask,
    handleSearch,
    filteredTasks,
  } = useTaskManager();

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search Task"
          value={searchKeyword}
        />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
