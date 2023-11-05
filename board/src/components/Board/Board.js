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

  const handleCreateTask = (listId) => {
    const listIndex = lists.findIndex((list) => list.listing_id === listId);
    if (listIndex >= 0) {
      const newTask = { task_title: values.task_title, task_description: values.task_description };

   
      if (listCreated && lists[listIndex].tasks.length === 0) {
        const dataToSend = {
          list_title: lists[listIndex].list_title,
          task_title: newTask.task_title,
          task_description: newTask.task_description,
        };
     
        sendTaskData(dataToSend);
        handleGetData();
      }
else{
  const dataToSend = {
    task_title: newTask.task_title,
    task_description: newTask.task_description,
    listing_id: listId,

  };
  sendTaskData(dataToSend);
  handleGetData();


}
      lists[listIndex].tasks.push(newTask);
      setLists([...lists]);
      localStorage.setItem('lists', JSON.stringify([...lists]));
   
    }
    setValues({ task_title: '', task_description: '' });
   
  };

  const sendTaskData = (data) => {
    const userToken = localStorage.getItem('tokens');
    const config = {
      headers: { Authorization: `Bearer ${userToken}` },
    };
    console.log(data)
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

    axios
      .get('http://localhost:3002/api/task/listing', config)
      .then((response) => {
        console.log("response",response)
        if (response.status === "success" && Array.isArray(response.data)) {
          const organizedList = response.data.map((item) => ({
            listing_id: item.listing_id,
            list_title: item.list_title,
            tasks: item.tasks.map((task) => ({
              task_title: task.task_title,
              task_description: task.task_description,
            })),
          }));
          setLists(organizedList);
        } else {
          console.error('Data structure is not as expected.');
        }
      })
    };


  useEffect(() => {
    handleGetData();
  }, [lists]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onDragEnd = (result) => {
    if (!result.destination || !result.source) {
      return;
    }

    const sourceListId = result.source.droppableId;
    const destinationListId = result.destination.droppableId;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const sourceList = lists.find((list) => list.listing_id === sourceListId);
    const destinationList = lists.find((list) => list.listing_id === destinationListId);

    if (!sourceList || !destinationList) {
      return;
    }

    const [draggedTask] = sourceList.tasks.splice(sourceIndex, 1);

    destinationList.tasks.splice(destinationIndex, 0, draggedTask);

    setLists([...lists]);
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
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="lists-container">
          {lists.map((list) => (
            <Droppable droppableId={list.listing_id.toString()} key={list.listing_id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="list"
                >
                  <h3>{list.list_title}</h3>
                  <ul>
                    {list.tasks.map((task, index) => (
                      <Draggable
                        draggableId={index.toString()}
                        index={index}
                        key={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div>{task.task_title}</div>
                            <div>{task.task_description}</div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                  </ul>
                  <div className="task-creation">
                    <input
                      name="task_title"
                      type="text"
                      placeholder="New Task Title"
                      value={values.task_title}
                      onChange={handleInput}
                    />
                    <input
                      name="task_description"
                      type="text"
                      placeholder="Task Description"
                      value={values.task_description}
                      onChange={handleInput}
                    />
                    <button onClick={() => handleCreateTask(list.listing_id)}>
                      Add Task
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
