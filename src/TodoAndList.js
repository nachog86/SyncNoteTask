
import React from "react";
import { useSyncedStore } from "@syncedstore/react";
import { store } from "./Store"; // Importando el store que hemos creado

export const TodoAndList = () => {
  const state = useSyncedStore(store);
  
  const addTodo = (title) => {
    state.todos.push({ completed: false, title: title });
  };

  const toggleTodo = (index) => {
    state.todos[index].completed = !state.todos[index].completed;
  };
  
  
  const renderTodos = () => {
    return state.todos.map((todo, index) => (
      <li key={index}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(index)}
          />
        {todo.title}
      </li>
    ));
  };
  
  const resetTodos = () => {
    try {
      
      state.todos.splice(0, state.todos.length); //Elimino todos los elementos del Array desde el primer elemento
    } catch (error) {
      console.error("An error occurred while resetting todos:", error);
    }
  };
  return (
    <div>
      <h3>Todo List</h3>
      <ul>{renderTodos()}</ul>
     
      <button onClick={() => addTodo(prompt("New Todo:", ""))}>Add Todo</button>
      <button onClick={resetTodos} style={{ marginLeft: '10px' }}>Reset Todo</button>
    </div>
  );
};
export default TodoAndList;