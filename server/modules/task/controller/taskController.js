require("dotenv").config();

// importing from library
const { body } = require("express-validator");

// importing connection
const { taskCreationMiddleWare, taskCreationController, taskListController, moveTaskMiddleware, moveTaskController, taskStausUpdateMiddleware, taskStausUpdateController } = require("../service/taskService");

const create_task = [
    body("task_title").trim().isLength({ min: 5 }).withMessage("Invalid title length.").bail().isAlphanumeric('en-US', { ignore: ' ' }).withMessage("Invalid title format."),
    body("task_description").trim().isLength({ min: 10 }).withMessage("Invalid description length."),
    taskCreationMiddleWare,
    taskCreationController
];

const task_list = [
    taskListController
];

const move_task = [
    body("destination_list_id").trim().isNumeric().withMessage("Invalid list details provided."),
    body("task_id").trim().isNumeric().withMessage("Invalid task details provided."),
    moveTaskMiddleware,
    moveTaskController
];

const status_change = [
    body("task_status").trim().isBoolean().withMessage("Invalid task status provided."),
    body("task_id").trim().isNumeric().withMessage("Invalid task details provided."),
    taskStausUpdateMiddleware,
    taskStausUpdateController
];

module.exports = {
    create_task,
    task_list,
    move_task,
    status_change
}

