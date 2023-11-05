import React, { useState, useEffect } from 'react';
import "./List.css";
import axios from 'axios';

const List = () => {

  let data = {
    title: "",
    description: "description",
    list_id: "",
    list_title: "dsfdsf"
  }
  const [listTasks, setlistTasks] = useState([])
  const [listTitle, setListTitle] = useState('');
  const [values, setValues] = useState(data);
  const [getListData,setListData]=useState([])



  const handleCreateTask = () => {
    const userToken = localStorage.getItem("tokens")
    const config = {
      headers: { Authorization: `Bearer ${userToken}`, },
    };
    axios.post('http://localhost:3002/api/task/create', {
      ...values,
    }, config)
      .then((response) => {
        console.log('Task created successfully:', response.data);
        HandleGetData();
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  };

  const HandleGetData = async()=>{
   
    const userToken = localStorage.getItem("tokens")
    const config = {
      headers: { Authorization: `Bearer ${userToken}`, },
    }; 

    axios.get('http://localhost:3002/api/task/listing', {
    }, config)
      .then((response) => {
       setListData(response.data)
      })
      .catch((error) => {
        console.error('Error creating task:', error);
      });
  }


  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, "title": value })
    //setValues(e.target.value)
    console.log(values)
  }

  return (
    <div className="list">
      <h3>{listTitle}</h3>
      <ul>
        {getListData.map((item) => (
          <li key={index}>
            <div>
              task={item.title}
              </div>
          </li>
        ))}
      </ul>
      <div className="task-creation">
        <input
          name="title"
          type="text"
          placeholder="New Task Title"
          value={values?.title}
          onChange={handleInput}
        />
        <button onClick={handleCreateTask}>Add Task</button>
      </div>
    </div>
  );
};

export default List;
