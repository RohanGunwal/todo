const router = require("express").Router();
const {
  getTodos,
  addTodo,
  updateTodo,
} = require("../controllers/todoController.js");

router.get("/", getTodos);
router.post("/", addTodo);
router.put("/:id", updateTodo);

module.exports = router;
