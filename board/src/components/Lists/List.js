import React, { useState,useEffect } from 'react';
import Task from '../Task/task';
import "./List.css";
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

  const List = ({ title, listId, onAddTask }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [listTasks, setListTasks] = useState([]);
  
    useEffect(() => {
      // Fetch tasks for the specific list using a GET request
      axios.get(`http://localhost:3002/api/task/listing`)
        .then((response) => {
          setListTasks(response.data);
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    }, [listId]); // Run this effect when the listId changes
  
    const handleAddTask = () => {
      if (newTaskTitle.trim() === '') return;
  
      const newTask = { title: newTaskTitle, description: '' };
      setListTasks([...listTasks, newTask]);
      onAddTask(newTask);
      setNewTaskTitle('');
    };
    const handleTaskDescriptionChange = (index, description) => {
      const updatedTasks = [...listTasks];
      updatedTasks[index].description = description;
      setListTasks(updatedTasks);
    };

  return (
    <div className="list">
      <h3>{title}</h3>
      <ul>
      {listTasks.map((task, index) => (
          <li key={index}>
            <Task
              task={task}
              onTaskDescriptionChange={(description) =>
                handleTaskDescriptionChange(index, description)
              }
            />
          </li>
        ))}
      </ul>
      <div className="task-creation">
        <input
          type="text"
          placeholder="New Task Title"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default List;
