const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = 3000;

const trainBot = require("./trainBot");
const getAnswer = require("./getAnswer");

app.use(bodyParser.json());
app.get("/train-bot", trainBot);
app.post("/get-answer", getAnswer);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
