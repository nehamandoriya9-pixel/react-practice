import React, { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editText, setEditText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const addTodo = () => {
    if (!todo.trim()) return;

    const newTodo = {
      id: Date.now(),
      todo: todo.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTodo("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setEditText("");
    }
  };

  const startEditing = (item) => {
    setEditText(item.todo);
    setEditingId(item.id);
  };

  const editTodo = (id) => {
    if (!editText.trim()) return;

    const updatedTodo = todos.map((item) =>
      item.id === id ? { ...item, todo: editText.trim() } : item,
    );

    setTodos(updatedTodo);
    setEditingId(null);
    setEditText("");
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-4">
      <div className="bg-gray-300 rounded-xl shadow-md w-full max-w-3xl p-3">
        <h1 className="text-center font-bold text-2xl">Todo App</h1>
        <div className="p-2 gap-3 flex">
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTodo();
            }}
            placeholder="Enter your todo..."
            className="bg-gray-100 p-2 rounded-md shadow-md flex-1 min-w-0"
          />

          <button
            onClick={addTodo}
            className="bg-green-400 rounded-md p-2 font-bold text-green-950"
          >
            Add Todo
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 p-2 gap-2">
          {todos.map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 flex items-center gap-2 p-2 rounded-md shadow-md"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleComplete(item.id)}
              />

              {editingId === item.id ? (
                <div className="flex flex-1 gap-2 min-w-0">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") editTodo(item.id);
                    }}
                    className="bg-white p-1 rounded-md w-full min-w-0"
                    autoFocus
                  />

                  <button
                    onClick={() => editTodo(item.id)}
                    className="bg-green-400 p-2 rounded-md font-bold"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-between gap-2 min-w-0">
                  <p
                    className={`break-words ${item.completed ? "line-through text-gray-500" : "font-bold"}`}
                  >
                    {item.todo}
                  </p>

                  <button
                    onClick={() => startEditing(item)}
                    className="bg-gray-400 p-2 rounded-md shadow-md text-sm font-bold"
                  >
                    Edit
                  </button>
                </div>
              )}

              <button
                onClick={() => deleteTodo(item.id)}
                className="bg-red-500 text-sm font-bold p-2 rounded-md shadow-md"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {todos.length > 0 && (
          <div className="p-3 font-bold">
            Remaining Todos: {todos.filter((item) => !item.completed).length}
          </div>
        )}
      </div>
    </div>
  );
}
