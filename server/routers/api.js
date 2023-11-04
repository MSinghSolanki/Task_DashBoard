// importing from library
const express = require("express");

// initating rooutes
const app = express();

// importing routers
const pincodeRoute = require("../modules/user/routes/index");
const taskRouter = require("../modules/task/routes/index");

// preparing routes
app.use("/user", pincodeRoute);
app.use("/task", taskRouter);

module.exports = app;