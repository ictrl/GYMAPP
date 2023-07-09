const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const todo = req?.body?.todo;
  

    if (!todo) return res.status(400).json({ err: "'todo' field is required." });

    const Doc = new Todo({ todo });
    const doc = await Doc.save();
    return res.json(doc);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};


exports.getTodos = async (req, res) => {
  try {
    const docs = await Todo.find({});
    return res.json(docs);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Todo.findByIdAndDelete(id)
    return res.json(doc);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};
