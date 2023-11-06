import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Board.css';

const TaskBoard = () => {
  const BSE_URL = process.env.REACT_APP_BASE_URL;
  let data = {
    task_title: "",
    task_description: "",
    listing_id: "",
    list_title: ""
  }

  const [lists, setLists] = useState([]);
  const [values, setValues] = useState(data);
  const [showNewListInput, setShowNewListInput] = useState(false);


  const toggleNewListInput = () => {
    setShowNewListInput(!showNewListInput);
  };

  const handleListCreate = () => {
    if (values?.list_title === "") {
      alert("Please Enter New List Title")
    } else {
      setShowNewListInput(false);
      setLists([...lists, {
        "listing_id": "",
        "list_title": values?.list_title,
        "tasks": [
        ]
      }])

    }
  }

  const handleInputForList = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
    console.log("values", values)
  }

  const sendTaskData = (id) => {
    const userToken = localStorage.getItem('tokens');
    const config = { headers: { Authorization: `Bearer ${userToken}` }, }

    let sendTaskData
    if (id == "" && values?.list_title != "") {
      sendTaskData = {
        task_title: values?.task_title,
        task_description: values?.task_description,
        listing_id: "",
        list_title: values?.list_title
      }
    } else {
      sendTaskData = {
        task_title: values?.task_title,
        task_description: values?.task_description,
        listing_id: id,
        list_title: ""
      }
    }

    axios.post(BSE_URL + '/api/task/create', sendTaskData, config)
      .then((response) => {
        console.log('Data sent to API:', response);
        setValues(data)
        handleGetData();
      
      })
      .catch((error) => {
        console.error('Error sending data to API:', error);
      });
  }

  const handleGetData = () => {
    const userToken = localStorage.getItem('tokens');
    const config = { headers: { Authorization: `Bearer ${userToken}` }, }

    axios.get(`${BSE_URL}/api/task/listing`, config)
      .then((response) => {
        if (response?.data?.status === "success") {
          setLists(response?.data?.data);
        } else {
          console.error('Data structure is not as expected.');
        }
      })
  }

  const onCheckChange=(task_id,task_status)=>{
    const userToken = localStorage.getItem('tokens');
    const config = { headers: { Authorization: `Bearer ${userToken}` }, }

    let sendTaskData={
      task_id:task_id,
      task_status:task_status
    }
  
    

    axios.post(BSE_URL + '/api/task/status-change', sendTaskData, config)
      .then((response) => {
        console.log('Data sent to API:', response);
        setValues(data)
        handleGetData();
      
      })
      .catch((error) => {
        console.error('Error sending data to API:', error);
      });
  }

  useEffect(() => {
    handleGetData();
  }, []);

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
              name="list_title"
              type="text"
              placeholder="New List Title"
              // value={listTitle}
              onChange={handleInputForList}
            />
            <button onClick={handleListCreate}>Create List</button>
          </div>
        )}
      </div>
      <div className="lists-container">
        {lists?.map((item, listIndex) => (
          <div key={listIndex} className="list">
            <h3>{item?.list_title}</h3>
            <ul>
              {item?.tasks.map((taskData, taskIndex) => (
             
                <li key={taskIndex}>
                  {console.log(taskIndex)}
                  <div><input type='checkbox' checked={taskData?.task_status} value={taskData?.task_status} onChange={()=>{onCheckChange(taskData?.task_id,taskData?.task_status?0:1)}}/></div>  
                  <div>{taskData?.task_title}</div>
                  <div>{taskData?.task_description}</div>
                </li>
              ))}
            </ul>

            <div className="task-creation">
              <input
                name="task_title"
                type="text"
                placeholder="New Task Title"
                // value={values?.task_title}
                onChange={handleInputForList}
              />
              <input
                name="task_description"
                type="text"
                placeholder="Task Description"
                onChange={handleInputForList}
              />

            </div>

            <button onClick={(e) => sendTaskData(item?.listing_id)}>Add Task</button>



          </div>
        ))}

      </div>
    </div>
  );
};

export default TaskBoard;
