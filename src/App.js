import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskChanges, setTaskChanges] = useState({});
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    const [taskName, count] = taskInput.split(/\s(\d+)$/);
    const newTasks = [...tasks];
    const newTaskChanges = { ...taskChanges };

    for (let i = 0; i < (count ? parseInt(count) : 1); i++) {
      newTasks.push(taskName);
      newTaskChanges[taskName] = (newTaskChanges[taskName] || 0); 
    }

    setTasks(newTasks);
    setTaskChanges(newTaskChanges);
    setTaskInput('');
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const updateTask = (index, newName) => {
    const newTasks = [...tasks];
    newTasks[index] = newName;
    setTasks(newTasks);

    const newTaskChanges = { ...taskChanges };
    newTaskChanges[newName] = (newTaskChanges[newName] || 0) + 1; 
    setTaskChanges(newTaskChanges);

    setEditingIndex(-1);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  return (
    <div className="App">
      <h1 className='text'>Day Goals!</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a task (e.g., Write code 3)"
          value={taskInput}
          onChange={handleInputChange}
        />
        <button onClick={addTask} className='button'>Add Todo</button>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task">
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={task}
                  onChange={(event) => setTaskInput(event.target.value)}
                />
                <button onClick={() => updateTask(index, task)} className='edit'>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={() => setEditingIndex(-1)} className='cancel'>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <>
                <span>{task} (Changed {taskChanges[task] || 0} Times)</span>
                <div className="actions">
                  <button onClick={() => startEditing(index)} className='edit'>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => deleteTask(index)} className='delete'>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
