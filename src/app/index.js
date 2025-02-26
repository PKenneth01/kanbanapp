import { useState } from "react";

export default function Home() {
  //State to manage columns and tasks
  const [columns, setColumns] = useState([
    { id: 1, title: "To Do", tasks: [] },
    { id: 2, title: "In Progress", tasks: [] },
    { id: 3, title: "Done", tasks: [] },
  ]);
  
  const [taskInput, setTaskInput] = useState("");

  //Add a column
  const addColumn = () => {
    const newColumn = { id: columns.length + 1, title: "New Column", tasks: [] };
    setColumns([...columns, newColumn]);
  };

  //Add a task to a column
  const addTask = (columnId) => {
    if (taskInput.trim() === "") return;
    const newColumns = columns.map((column) => {
      if (column.id === columnId) {
        return { ...column, tasks: [...column.tasks, taskInput] };
      }
      return column;
    });
    setColumns(newColumns);
    setTaskInput("");
  };

  //Render layout with columns and tasks
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center">Kanban Board</header>
      <main className="flex p-4 space-x-4">
        {columns.map((column) => (
          <div key={column.id} className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold">{column.title}</h2>
            {/* Render tasks within each column */}
            <div className="space-y-2">
              {column.tasks.map((task, index) => (
                <div key={index} className="bg-gray-200 p-2 rounded-md">{task}</div>
              ))}
            </div>
            {/* Task input and add task button */}
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="border p-2 rounded w-full mt-4"
              placeholder="Add a task"
            />
            <button
              onClick={() => addTask(column.id)}
              className="bg-blue-600 text-white p-2 rounded-full mt-2"
            >
              Add Task
            </button>
          </div>
        ))}
        <button
          onClick={addColumn}
          className="bg-green-600 text-white p-2 rounded-full mt-4"
        >
          Add Column
        </button>
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center mt-auto">Footer content</footer>
    </div>
  );
}

//pages/index.js
import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

//GraphQL Query to fetch columns and tasks
const GET_COLUMNS = gql`
  query GetColumns {
    columns {
      id
      title
      tasks {
        id
        content
      }
    }
  }
`;

const CREATE_TASK = gql`
  mutation CreateTask($columnId: ID!, $taskContent: String!) {
    createTask(columnId: $columnId, content: $taskContent) {
      id
      content
    }
  }
`;

export default function Home() {
  //Fetch columns from GraphQL server
  const { loading, error, data } = useQuery(GET_COLUMNS);
  const [createTask] = useMutation(CREATE_TASK);
  
  const [taskInput, setTaskInput] = useState("");

  const addTask = (columnId) => {
    if (taskInput.trim() === "") return;
    createTask({ variables: { columnId, taskContent: taskInput } });
    setTaskInput("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  //Render columns and tasks fetched from GraphQL
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center">Kanban Board</header>
      <main className="flex p-4 space-x-4">
        {data.columns.map((column) => (
          <div key={column.id} className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold">{column.title}</h2>
            <div className="space-y-2">
              {column.tasks.map((task) => (
                <div key={task.id} className="bg-gray-200 p-2 rounded-md">{task.content}</div>
              ))}
            </div>
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="border p-2 rounded w-full mt-4"
              placeholder="Add a task"
            />
            <button
              onClick={() => addTask(column.id)}
              className="bg-blue-600 text-white p-2 rounded-full mt-2"
            >
              Add Task
            </button>
          </div>
        ))}
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center mt-auto">Footer content</footer>
    </div>
  );
}

import { useState, useEffect } from "react";

//Fetch tasks from REST API
const API_URL = "https://api.example.com/tasks"; // Replace with your API URL

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from REST API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Render tasks from REST API
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-600 text-white p-4 text-center">Kanban Board</header>
      <main className="flex p-4 space-x-4">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
          <h2 className="text-xl font-bold">Tasks</h2>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="bg-gray-200 p-2 rounded-md">{task.content}</div>
            ))}
          </div>
        </div>
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center mt-auto">Footer content</footer>
    </div>
  );
}
