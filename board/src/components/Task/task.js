import React, { useState } from 'react';
import axios from 'axios';
import "./task.css"

const Task = () => {
  const [values, setValues] = useState({
    title: "",
    description: ""
  });

  const handleCreateTask = () => {

  const userToken = localStorage.getItem('tokens')

    // const config = {
    //   headers: {Authorization: `Bearer ${userToken}`,},
    // };

    axios.post('http://localhost:3002/api/task/create', values,{})
      .then((response) => {
        console.log('Task created successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  const handleCheckboxChange = (e) => {
   
  };

  return (
    <div className="task">
      <input type="checkbox" onChange={handleCheckboxChange} />
      <span>{values.title}</span>
      <input
        type="text"
        placeholder="Title"
        value={values.title}
        onChange={(e) => setValues({ ...values, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={values.description}
        onChange={(e) => setValues({ ...values, description: e.target.value })}
      />
      <button onClick={handleCreateTask}>Create Task</button>
    </div>
  );
};

export default Task;
