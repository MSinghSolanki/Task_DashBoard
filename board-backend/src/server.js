const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
// Define routes
const userRoutes = require('../src/Routes/userroute.js');
const taskRoutes = require("../src/Routes/taskroute.js");
const listRoutes = require("../src/Routes/listroute.js");

app.use("/task",taskRoutes);
app.use("/list",listRoutes);
app.use('/user', userRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
