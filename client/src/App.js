import React from "react";
import axios from "axios";
const { useState, useEffect } = React;
const Addbar = ({ addTodo }) => {
  const [currentInput, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentInput.trim().length === 0) {
      return;
    } else {
      addTodo(currentInput.trim());
      setInput("");
    }
  };

  return (
    <form className="addbar" onSubmit={handleSubmit}>
      <input className="addbar_textinput" type="text" placeholder="Add todo here" value={currentInput} onChange={(e) => setInput(e.target.value)} />
      <input className="addbar_btn btn" type="submit" value="Add" />
    </form>
  );
};

const List = ({ todos, deleteTodo }) => {
  console.log("file: App.js:26  todos:", todos);
  const showList =
    todos &&
    todos.length > 0 &&
    todos.map((todo, index) => {
      const handleDelete = (event) => {
        const index = Number(event.target.id);
        deleteTodo(index);
      };

      return (
        <div className="list_todo" key={index}>
          <span className="list_todo_name">{todo.todo}</span>
          <button className="list_todo_deletebtn" type="button" id={index} onClick={handleDelete}>
            {" "}
            X{" "}
          </button>
        </div>
      );
    });

  return <div className="list">{showList}</div>;
};

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = async (name) => {
    //call post api
    const api = "http://localhost:5001/todo";
    const postTodo = await axios.post(api, {
      todo: name,
    });

    setTodos([...todos, { todo: name }]);
  };

  const deleteTodo = (index) => {
    setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const api = "http://localhost:5001/todo";

        const todos = await axios.get(api);
        // console.log("file: App.js:67  todos:", todos.data)
        setTodos(todos.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>Todo App</h1>
      <h3>Using React Hooks</h3>
      <Addbar addTodo={addTodo} />
      <List todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
