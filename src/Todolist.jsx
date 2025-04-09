import React, { useState } from 'react';

function Todolist() {
    const [todoText, setTodoText] = useState('');

    const handleInputChange = (e) => {
        setTodoText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todoText.trim() !== '') {
            // Here you would typically add the todo to your list
            console.log('New todo:', todoText);
            setTodoText('');
        }
    };

    return (
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
        </div>
    );
}

export default Todolist;
