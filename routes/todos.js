const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = new Todo({
      title: title,
      description: description,
    });
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }
    const { title, description } = req.body;
    todo.title = title || todo.title;
    todo.description = description || todo.description;

    const updatedTodo = await todo.save();
    res.status(200).json(updatedTodo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await todo.remove();
    res.status(204).json("Deleted todo",todo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 10; 
    const skip = (page - 1) * pageSize; 
    const total = await Todo.countDocuments();

    const todos = await Todo.find().skip(skip).limit(pageSize); 

    res.json({
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
      todos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;