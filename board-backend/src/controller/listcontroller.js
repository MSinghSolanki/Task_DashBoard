// controllers/listController.js
const List = require('../models/listmodel.js');

const createList = async (name) => {
  return List.create({ name });
};

module.exports = {
  createList,
};
