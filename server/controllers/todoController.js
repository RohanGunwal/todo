const Todo = require("../models/todoModel.js");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ GetTodosError: err.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(200).json(newTodo);
  } catch (err) {
    res.status(400).json({ AddTodoError: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, req.body);
    const updatedTodo = await Todo.findById(req.params.id);
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ UpdateTodoError: err.message });
  }
};

module.exports = {
  getTodos,
  addTodo,
  updateTodo,
};
