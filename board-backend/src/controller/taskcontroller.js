// controllers/taskController.js
const { DataTypes } = require("sequelize");
const con = require("../config/connect.js");
const Task = require("../models/taskmodel.js");

const createTask = async (title, description) => {
  try {
    const Task = require("../models/taskmodel.js")(con, DataTypes);
    const newTask = await Task.create({
      title,
      description,
    });

    return newTask;
  } catch (error) {
    throw new Error("Task creation failed: " + error.message);
  }
};

const markTaskAsCompleted = async (taskId) => {
  const task = await Task.findByPk(taskId);
  if (task) {
    task.completed = true;
    await task.save();
    return task;
  } else {
    throw new Error("Task not found");
  }
};

const creatTaskController = [];

module.exports = {
  createTask,
  markTaskAsCompleted,
};
