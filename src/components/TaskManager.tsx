import { useState } from "react";
import { nanoid } from "nanoid";

// Modèle de tâche
interface Task {
  id: string;
  title: string;
}

// Hook personnalisé pour gérer les opérations sur les tâches
const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // Ajouter une nouvelle tâche
  const addTask = (title: string) => {
    if (title.trim() === "") return;

    const newTask: Task = {
      id: nanoid(),
      title: title.trim(),
    };
    setTasks([...tasks, newTask]);
  };

  // Supprimer une tâche
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Mettre à jour le titre d'une tâche
  const updateTaskTitle = (id: string, newTitle: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: newTitle.trim() } : task
    );
    setTasks(updatedTasks);
  };

  // Filtrer les tâches en fonction du mot-clé de recherche
  const filterTasks = (keyword: string) => {
    setSearchKeyword(keyword.trim());
  };

  // Obtenir les tâches filtrées
  const getFilteredTasks = (): Task[] => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  };

  return {
    tasks,
    searchKeyword,
    addTask,
    deleteTask,
    updateTaskTitle,
    filterTasks,
    getFilteredTasks,
  };
};

export default useTaskManager;
