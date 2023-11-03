// routes/listRoutes.js
const express = require('express');
const router = express.Router();
const listController = require('../controller/listcontroller.js');

// POST /list - Create a new list
router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const list = await listController.createList(name);
    res.json(list);
  } catch (error) {
    res.status(400).json({ message: 'List creation failed', error: error.message });
  }
});

module.exports = router;
