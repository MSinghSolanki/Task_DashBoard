// controllers/taskController.js
const Task = require('../models/tsakmodel.js');

const createTask = async (title, description) => {
  return Task.create({ title, description });
};

const markTaskAsCompleted = async (taskId) => {
  const task = await Task.findByPk(taskId);
  if (task) {
    task.completed = true;
    await task.save();
    return task;
  } else {
    throw new Error('Task not found');
  }
};

module.exports = {
  createTask,
  markTaskAsCompleted,
};
