const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());


const API_KEY = "APTITUDE-QUIZ-KEY-875447";


function authenticateApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(401).json({ message: "Invalid or missing API Key" });
  }
  next();
}


let questions = [];


app.post("/api/questions", authenticateApiKey, (req, res) => {
  const { question, options, correctAnswer, level } = req.body;

  if (!question || !options || !correctAnswer || !level) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newQuestion = {
    id: uuidv4(),
    question,
    options,
    correctAnswer,
    level
  };

  questions.push(newQuestion);
  res.status(201).json({ message: "Question added", data: newQuestion });
});


app.get("/api/questions", authenticateApiKey, (req, res) => {
  res.json(questions);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});