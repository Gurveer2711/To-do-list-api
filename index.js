const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

//import routes
const authRoute = require("./routes/auth");
const todosRoute = require("./routes/todos");

app.use("/api/user", authRoute);
app.use("/api/todo", todosRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
