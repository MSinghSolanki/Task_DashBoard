// importing from library
require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// enviroment variable
const APP_PORT = process.env.APP_PORT;
const BASE_URL = process.env.APP_BASE_URL;
const APP_NAME = process.env.APP_NAME;

// importing methodes and functions
const master_connection = require("./connection/masterDbConnection");

// checking connection
const { connectionCheck } = require("./helper/connectionCheck/dbConnectionCheck");

//importing routes
const routes = require("./routers/api");
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// declaring routes
app.use("/api", routes);
const jsonParser = bodyParser.json();

app.get("*", jsonParser, (req, res) => {
  return res.send("404 Page");
});

app.listen(APP_PORT, function () {
  console.log(`${APP_NAME} is listening at ${BASE_URL}${APP_PORT}`);
  connectionCheck(master_connection, "Master DB");
});
