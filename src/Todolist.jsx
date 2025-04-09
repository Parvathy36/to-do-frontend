import React, { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Fetch tasks
  useEffect(() => {
    fetch('http://localhost:3001/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Add task
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    })
    .then(() => {
      setInput('');
      fetch('http://localhost:3001/api/tasks')
        .then(res => res.json())
        .then(data => setTasks(data));
    });
  };

  // Delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:3001/api/tasks/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      setTasks(tasks.filter(task => task._id !== id));
    });
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Todo List</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          className="task-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit" className="add-button">Add Task</button>
      </form>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task._id} className="task-item">
            <span className="task-text">{task.text}</span>
            <button 
              onClick={() => deleteTask(task._id)}
              className="delete-button"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
