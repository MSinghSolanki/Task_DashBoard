const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const  con  = require("../src/config/connect.js");

app.use(express.json());

// Define routes
const userRoutes = require('../src/Routes/userroute.js');
const taskRoutes = require("../src/Routes/taskroute.js");
const listRoutes = require("../src/Routes/listroute.js");

app.use("/task", taskRoutes);
app.use("/list", listRoutes);
app.use('/user', userRoutes);

// Start the server
// con.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//   } else {
//     console.log('Database connection established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
//   }
// });
