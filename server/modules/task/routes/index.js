// importing from library
const express = require("express");

// initating rooutes
const Routers = express.Router();

// importin funtion and methode
const { create_task, task_list, move_task, status_change } = require("../controller/taskController");

const { authenticateJWT } = require("../../../helper/token/verifyToken");


Routers.post("/create", authenticateJWT, create_task);
Routers.get("/listing", authenticateJWT, task_list);
Routers.post("/move", authenticateJWT, move_task);
Routers.post("/status-change", authenticateJWT, status_change);


module.exports = Routers;