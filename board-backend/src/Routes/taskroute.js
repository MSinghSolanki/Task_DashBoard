// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controller/taskcontroller.js');

// POST /task - Create a new task
router.post('/createtask', async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = await taskController.createTask(title, description);
    res.json(task);
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Task creation failed', error: error.message });
  }
});

// PUT /task/:taskId/complete - Mark a task as completed
router.put('/:taskId/complete', async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await taskController.markTaskAsCompleted(taskId);
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: 'Task completion failed', error: error.message });
  }
});

module.exports = router;
