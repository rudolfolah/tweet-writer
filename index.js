require("dotenv").config();
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const app = express();
app.set("views", "./views");
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
