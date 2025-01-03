const express = require('express');
const app = express();
require("dotenv").config();

const mongoose = require('mongoose');
const session = require("express-session");

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//import routes
const authroute = require('./routes/auth');
const todosroute = require("./routes/todos");

app.use("/api/user", authRoute);
app.use("/api/todo", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
