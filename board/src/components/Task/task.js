import React, { useState } from 'react';
import axios from 'axios';
import "./task.css"

const Task = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const handleTaskComplete = () => {
    onTaskComplete();
  };

  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setEditedDescription(newDescription);
    onTaskDescriptionChange(newDescription);
  };

  const handleCreateTask = () => {
    const title = title;
    const description = description;

 
    axios.post('http://localhost:3002/api/task/create', {
      title,
      description,
    })
      .then((response) => {
        console.log('Task created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  return (
    <div className="task">
      <input type="checkbox" onChange={handleTaskComplete} />
      <span>{task.title}</span>
      <div>
      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>Add Description</button>
      )}
      {isEditing && (
        <div>
          <textarea
            value={editedDescription}
            onChange={handleDescriptionChange}
            placeholder="Task Description"
          />
          <button onClick={() => {
            handleCreateTask();
            setIsEditing(false); // Exit editing mode
          }}>Save Description</button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Task;
