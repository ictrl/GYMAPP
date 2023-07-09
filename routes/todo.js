const router = require("express").Router();
const { createTodo, getTodos, deleteTodo } = require("../controller/todo");

router.post("/", createTodo)
router.get("/", getTodos)
router.delete("/:id", deleteTodo)

module.exports = router;
