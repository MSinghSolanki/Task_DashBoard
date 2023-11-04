import React, { useState } from 'react';
import List from '../Lists/List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Board.css';

const TaskBoard = () => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleNewList = () => {
    if (newListTitle.trim() === '') return;

    setLists([...lists, { title: newListTitle, tasks: [] }]);
    setNewListTitle('');
    setShowNewListInput(false);
  };

  const getTokens = ()=>{
    localStorage.getItem("")
  }

  const toggleNewListInput = () => {
    setShowNewListInput(!showNewListInput);
  };

  const addTaskToList = (listIndex) => {
    if (newTaskTitle.trim() === '') return;

    const updatedLists = [...lists];
    updatedLists[listIndex].tasks.push({ title: newTaskTitle, description: '' });
    setLists(updatedLists);
    setNewTaskTitle('');
  };

  return (
    <div className="task-board">
      <div className="new-list">
        {!showNewListInput ? (
          <div className="new-list-card" onClick={toggleNewListInput}>
            <FontAwesomeIcon icon={faPlus} />
          </div>
        ) : (
          <div className="new-list-input">
            <input
              type="text"
              placeholder="New List Title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
            />
            <button onClick={handleNewList}>Create List</button>
          </div>
        )}
      </div>
      <div className="lists-container">
        <div className="lists">
          {lists.map((list, index) => (
            <List
              key={index}
              title={list.title}
              tasks={list.tasks}
              onAddTask={() => addTaskToList(index)}
              newTaskTitle={newTaskTitle}
              setNewTaskTitle={(title) => setNewTaskTitle(title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
