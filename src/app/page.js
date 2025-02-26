/*

import { useState } from 'react';

export default function Home() {
  const [columns, setColumns] = useState([]);

  const addColumn = () => {
    const newColumn = {
      id: Date.now(),
      title: `Column ${columns.length + 1}`,
      tasks: [],
    };
    setColumns([...columns, newColumn]);
  };

  const addTask = (columnId) => {
    const newTask = {
      id: Date.now(),
      text: `Task ${columns.find((col) => col.id === columnId).tasks.length + 1}`,
    };
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Kanban Board</h1>
      <button
        onClick={addColumn}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Column
      </button>
      <div className="flex gap-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-gray-100 p-4 rounded w-64">
            <h2 className="font-semibold mb-2">{column.title}</h2>
            <button
              onClick={() => addTask(column.id)}
              className="bg-green-500 text-white px-2 py-1 rounded mb-2"
            >
              Add Task
            </button>
            <div className="space-y-2">
              {column.tasks.map((task) => (
                <div key={task.id} className="bg-white p-2 rounded shadow">
                  {task.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/