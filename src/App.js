import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskCounts, setTaskCounts] = useState({});

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const addTask = () => {
    const [taskName, count] = taskInput.split(/\s(\d+)$/);
    const newTasks = [...tasks];
    const newTaskCounts = { ...taskCounts };

    for (let i = 0; i < (count ? parseInt(count) : 1); i++) {
      newTasks.push(taskName);
      newTaskCounts[taskName] = (newTaskCounts[taskName] || 0) + 1;
    }

    setTasks(newTasks);
    setTaskCounts(newTaskCounts);
    setTaskInput('');
  };

  const deleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const updateTask = (index) => {
    const newTasks = [...tasks];
    const taskToUpdate = newTasks[index];
    newTasks[index] = `${taskToUpdate} (Updated ${taskCounts[taskToUpdate] || 0} Times)`;
    setTasks(newTasks);
    setTaskCounts({ ...taskCounts, [taskToUpdate]: (taskCounts[taskToUpdate] || 0) + 1 });
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
            <span>{task}</span>
            <div className="actions">
            <button onClick={() => updateTask(index)} className='edit'>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button onClick={() => deleteTask(index)} className='delete'>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
