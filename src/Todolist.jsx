import React, { useState, useEffect } from 'react';
function Todolist(){
    const [todoText, setTodoText] = useState('');
    const [todos, setTodos] = useState([]);
  
    // Fetch todos from the server when the component mounts
    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const response = await fetch('http://localhost:3000/todos');
          const data = await response.json();
          setTodos(data);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };
  
      fetchTodos();
    }, []);
  
    const handleInputChange = (e) => {
      setTodoText(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!todoText) return;
  
      try {
        const response = await fetch('http://localhost:3000/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: todoText }),
        });
  
        if (response.ok) {
          const newTodo = await response.json();
          setTodos([...todos, newTodo]); // Update the todos state with the new todo
          setTodoText(''); // Clear the input after submission
        } else {
          console.error('Failed to add todo');
        }
      } catch (error) {
        console.error('Error:', error);
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
        </div>
    );
}
export default Todolist;