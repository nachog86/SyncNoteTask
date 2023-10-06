import React from 'react';
import Editor from './Editor'; // Asume que tienes un componente llamado Editor
import TodoAndList from './TodoAndList'; // Asume que tienes un componente llamado TodoAndList
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1>Welcome SyncNoteTask</h1>
      <div className="editor-todo-container">
        <div className="editor-container">
          <h2>Sync Note</h2>
          <Editor />
        </div>
        <div className="todo-container">
          <h2>List Task</h2>
          <TodoAndList />
        </div>
      </div>
    </div>
  );
};

export default App;

