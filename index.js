const express = require('express');
const app = express();
const mongoose = require('mongoose');

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


app.listen(3000, () => {
    console.log(`Server has started on port 3000`);
});