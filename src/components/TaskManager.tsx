import { FC } from "react";
import "./TaskManager.css";
import useTaskManager from "./useTaskManager";

// Composant TaskManager
export const TaskManager: FC = () => {
  const {
    tasks,
    searchKeyword,
    addTask,
    deleteTask,
    updateTaskTitle,
    filterTasks,
    getFilteredTasks,
  } = useTaskManager();

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          onChange={(e) => filterTasks(e.target.value)}
          placeholder="Search Task"
          value={searchKeyword}
        />
      </div>

      <div className="task">
        <input
          type="text"
          placeholder="Add new task"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>

      <ul className="container">
        {getFilteredTasks().map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                value={task.title}
                onChange={(e) => updateTaskTitle(task.id, e.target.value)}
              />
              <button onClick={() => deleteTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
