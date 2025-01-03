const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");
const auth = require("../middleware/auth");
const cookie = require('cookie-parser');

router.post("/", auth, async (req, res) => {
    const { title, description } = req.body;
  try {
    const todo = new Todo({
      title: title,
        description: description,
        user: req.user.id
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

router.delete("/:id",auth ,async (req, res) => {
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

router.get("/", auth ,async (req, res) => {
    const page = Math.max(1, Number.parseInt(req.query.page)) || 1;
    const limit = Math.max(1, Number.parseInt(req.query.limit)) || 10;
    try {
    const todos = await Todo.find({ user: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Todo.countDocuments({ user: req.user.id });
    const totalPages = Math.ceil(total / limit);
    res.json({
      data: todos,
      page,
      limit,
        total,
        totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;