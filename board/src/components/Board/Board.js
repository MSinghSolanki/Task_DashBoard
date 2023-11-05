import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Board.css';

const TaskBoard = () => {
  let data = {
    task_title: "",
    task_description: "",
    listing_id: "",
    list_title: ""
  }
  const [lists, setLists] = useState([]);
  const [listTitle, setListTitle] = useState('');
  const [showNewListInput, setShowNewListInput] = useState(false);
  const [values, setValues] = useState(data);
  const [listCreated, setListCreated] = useState(false)
  const [lastListingId, setLastListingId] = useState(0);
  const [taskValues, setTaskValues] = useState([]);

  const toggleNewListInput = () => {
    setShowNewListInput(!showNewListInput);
  };

 
  const handleListCreate = () => {
    if (listTitle) {
      const newList = { listing_id: lastListingId+1, list_title: listTitle, tasks: [] };
      setLists([...lists, newList]);
      localStorage.setItem('lists', JSON.stringify([...lists, newList]));

      // Set listCreated to true when a new list is created
      setListCreated(true);
    }
    setListTitle('');
    setShowNewListInput(false);
  };

  const setTaskValuesForList = (listIndex, newValues) => {
    const updatedValues = [...taskValues];
    updatedValues[listIndex] = newValues;
    setTaskValues(updatedValues);
  };
    // Input Handling for a specific list
    const handleInputForList = (e, listIndex) => {
      const { name, value } = e.target;
      const newValues = { ...taskValues[listIndex], [name]: value };
      setTaskValuesForList(listIndex, newValues);
    };

    const handleCreateTask = async (listIndex) => {
      if (listIndex >= 0) {
        const newTask = {
          task_title: taskValues[listIndex]?.task_title,
          task_description: taskValues[listIndex]?.task_description,
        };
    
        let dataToSend = {};
        const userToken = localStorage.getItem('tokens');
        const config = {
          headers: { Authorization: `Bearer ${userToken}` },
        };
    
        // Fetch the listing_id from the API
        const response = await axios.get('http://localhost:3002/api/task/listing', config);
        const listingId = response.data.data[0].listing_id; // Assuming it's the same for all items
    
        if (listCreated && lists[listIndex].tasks.length === 0) {
          dataToSend = {
            list_title: lists[listIndex].list_title,
            task_title: newTask.task_title,
            task_description: newTask.task_description,
          };
        } else if (lists[listIndex].listing_id === listingId) { // Compare the listing_id
          dataToSend = {
            task_title: newTask.task_title,
            task_description: newTask.task_description,
          };
        }
    
        try {
          await sendTaskData(dataToSend);
          await handleGetData();
    
          const newTaskValues = {
            ...taskValues[listIndex],
            task_title: '',
            task_description: '',
          };
          setTaskValuesForList(listIndex, newTaskValues);
    
          const updatedLists = [...lists];
          updatedLists[listIndex].tasks.push(newTask);
          setLists(updatedLists);
        } catch (error) {
          console.error('Error sending data to API:', error);
        }
      }
    };
    
    
    
  const sendTaskData = (data) => {
    const userToken = localStorage.getItem('tokens');
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };
    
    axios.post('http://localhost:3002/api/task/create', data, config)
   
      .then((response) => {
        console.log('Data sent to API:', response);
        // You can handle any further actions or updates here
      })
      .catch((error) => {
        console.error('Error sending data to API:', error);
      });
    
  };

  const handleGetData = async () => {
    const userToken = localStorage.getItem('tokens');
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };
  
    try {
      const response = await axios.get('http://localhost:3002/api/task/listing', config);
  
      if (response.data.status === "success") {
        const responseData = response.data.data;
        const mappedData = responseData.map((item) => ({
          listing_id: item.listing_id,
          list_title: item.list_title,
          tasks: item.tasks,
        }));
        setLists(mappedData);
  
        setLists(response.data.data);
      } else {
        console.error('Data structure is not as expected.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
   
  };

  



  useEffect(() => {
    handleGetData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
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
              name="list_title"
              type="text"
              placeholder="New List Title"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
            />
            <button onClick={handleListCreate}>Create List</button>
          </div>
        )}
      </div>
      <div className="lists-container">
      {lists.map((list, listIndex) => (
    <div key={listIndex} className="list">
      <h3>{list.list_title}</h3>
      <ul>
        {list.tasks.map((task, taskIndex) => (
          <li key={taskIndex}>
            <div>{task.task_title}</div>
            <div>{task.task_description}</div>
          </li>
        ))}
      </ul>
      <div className="task-creation">
        <input
          name="task_title"
          type="text"
          placeholder="New Task Title"
          value={taskValues[listIndex]?.task_title || ''}
          onChange={(e) => handleInputForList(e, listIndex)}
        />
        <input
          name="task_description"
          type="text"
          placeholder="Task Description"
          value={taskValues[listIndex]?.task_description || ''}
          onChange={(e) => handleInputForList(e, listIndex)}
        />
        <button onClick={() => handleCreateTask(listIndex)}>Add Task</button>
      </div>
    </div>
  ))}

      </div>
    </div>
  );
};

export default TaskBoard;
