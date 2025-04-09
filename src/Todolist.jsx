import React, { useState, useEffect } from 'react';

function Todolist() {
    const [todoText, setTodoText] = useState('');
    const [todos, setTodos] = useState([]);

    // Fetch todos from backend
    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/tasks');
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleInputChange = (e) => {
        setTodoText(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (todoText.trim() !== '') {
            try {
                const response = await fetch('http://localhost:3000/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ text: todoText, completed: false }),
                });
                
                if (response.ok) {
                    setTodoText('');
                    fetchTodos(); // Refresh the list
                }
            } catch (error) {
                console.error('Error adding todo:', error);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
            });
            
            if (response.ok) {
                fetchTodos(); // Refresh the list
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleToggle = async (id, completed) => {
        try {
            const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ completed: !completed }),
            });
            
            if (response.ok) {
                fetchTodos(); // Refresh the list
            }
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    return(
        <div className="contain">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit} className="insertbox">
                <input
                    type="text"
                    value={todoText}
                    onChange={handleInputChange}
                    placeholder="Enter a new todo"
                />
                <button type="submit">Insert</button>
            </form>
            
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo._id} className={todo.completed ? 'completed' : ''}>
                        <span onClick={() => handleToggle(todo._id, todo.completed)}>
                            {todo.text}
                        </span>
                        <button onClick={() => handleDelete(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todolist;
