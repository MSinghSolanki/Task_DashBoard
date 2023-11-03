// App.js

import React, { useState } from 'react';
// import List from './List';
import "./List.css"

 export const List =()=> {
    const [lists, setLists] = useState([]);
    const [listTitle, setListTitle] = useState('');
  
    const handleAddList = () => {
      if (listTitle.trim() !== '') {
        setLists([...lists, { id: Date.now(), title: listTitle, tasks: [] }]);
        setListTitle('');
      }
    };
  
  
    return (
      <div className="app">
        <div className="list-creation-button" onClick={handleAddList()}>
      <div className="button-card">
        <div className="circle-border">
          <div className="plus-sign">+</div>
        </div>
      </div>
    </div>
        {lists.map((list) => (
          <List key={list.id} list={list} />
        ))}
      </div>
    );
 
}


