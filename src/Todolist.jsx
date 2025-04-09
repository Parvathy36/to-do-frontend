import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // READ - Fetch all tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:3001/api/tasks');
    const data = await response.json();
    setTasks(data);
  };

  // CREATE - Add new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:3001/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    });
    setInput('');
    fetchTasks();
  };

  // UPDATE - Toggle completion status
  const toggleComplete = async (id, currentStatus) => {
    await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !currentStatus })
    });
    fetchTasks();
  };

  // UPDATE - Edit task text
  const startEditing = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
  };

  const saveEdit = async (id) => {
    await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: editText })
    });
    setEditingId(null);
    fetchTasks();
  };

  // DELETE - Remove task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'DELETE'
    });
    fetchTasks();
  };

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add</button>
      </form>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className={task.completed ? 'completed' : ''}>
            {editingId === task._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(task._id)}>Save</button>
              </>
            ) : (
              <>
                <span onClick={() => toggleComplete(task._id, task.completed)}>
                  {task.text}
                </span>
                <div className="task-actions">
                  <button onClick={() => startEditing(task)}>Edit</button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolist;
