const mongoose = require("mongoose");
const express = require("express");
const app = express();
const postsReq = require("./Routes/posts");
const getAPI = require("./Routes/get");
const updateData = require("./Routes/update");

require("dotenv/config");

app.use(express.json());

//Middleware
app.use("/weatherapi", postsReq);
app.use("/get", getAPI);
app.use("/update", updateData);

app.get("/", (req, res) => {
  res.send("Root.");
});

//Connect to DB
mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB.");
  }
);

const port = process.env.PORT || 3000;
app.listen(port);
