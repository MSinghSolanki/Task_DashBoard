// importing from library
const express = require("express");

// initating rooutes
const Routers = express.Router();

// importin funtion and methode
const { create_users, login_user } = require("../controller/userController");


Routers.post("/sign-up", create_users);
Routers.post("/login", login_user);


module.exports = Routers;