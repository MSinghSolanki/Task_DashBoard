const mysql = require("mysql");
const Sequelize = require('sequelize');
require('dotenv').config()
//Sequelize connection
var con = new Sequelize("task", "root", "", {
  host: "localhost",
    dialect: 'mysql',
    logging: true,
    timezone : '+05:30'
});
module.exports = con;
// var mysql = require('mysql2');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   DB:'task',
//   dialect:'mysql',
// });


// module.exports=con
