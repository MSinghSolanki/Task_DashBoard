import React, { useState } from 'react';
import axios from 'axios';
import "./task.css"

const Task = ({ task, onTaskComplete, onTaskDescriptionChange }) => {
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
    const title = task.title;
    const description = editedDescription;

    // Send a POST request to your API to create a new task
    axios.post('http://localhost:3001/task/createtask', {
      title,
      description,
    })
      .then((response) => {
        // Handle success, e.g., update the UI or display a success message
        console.log('Task created successfully:', response.data);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message to the user
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
