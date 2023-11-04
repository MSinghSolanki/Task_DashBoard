import React from 'react';
import './home.css';
import { Navbar } from '../Navbar/Navbar';
import TaskBoard from '../Board/Board';

export const Homepage = () => {
  return (
   <div>
      <TaskBoard/>
  </div>
  );
};

