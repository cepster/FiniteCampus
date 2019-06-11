const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

let newNotifications = [];
let grades = [];

const app = express();
app.use(cors());

app.get("/helloWorld", (req, res) => {
  res.status(200).send("Hello!");
});

app.get("/newNotifications", (req, res) => {
  res.status(200).send(newNotifications);
  newNotifications = [];
});

app.post("/saveGradebook", bodyParser.json(), (req, res) => {
  calculateGrades().then(() => {
    sendNotifications(req.body);
    res.status(200).send(req.body);
  });
});

app.listen(4000, () => console.log(`Example app listening on port 4000!`));

let calculateGrades = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};

let sendNotifications = newScores => {
  newScores.forEach(score => {
    console.log(score);
    newNotifications.push(
      `${score.studentName} has scored a ${score.score} on ${
        score.assignmentName
      }`
    );
  });
};
