console.log("do it");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const appRoutes = require("./routes/index.js");

//Middleware
app.use(cors());
app.use(express.json());

app.use(appRoutes);

// DB

mongoose.connect("mongodb://localhost:27017/jsonwebtoken", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log("mongoDB connection established");
});

//Listen to server
const port = 5003;

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
