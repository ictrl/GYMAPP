require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


const port = 5001;

//connect to DB
const connectMongo = async (params) => {
  await mongoose.connect(process.env.DB);
};
connectMongo()

//routes
app.use("/todo", require("./routes/todo"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
