import React from 'react';
function Todolist(){
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
