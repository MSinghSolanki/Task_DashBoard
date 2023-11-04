// importing from library
const Sequelize = require("sequelize");
require("dotenv").config();

// accessing environment variables
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DATABASE_NAME;

//making db connection
var log_connection = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: true,
  timezone: "+05:30",
});

module.exports = log_connection;
