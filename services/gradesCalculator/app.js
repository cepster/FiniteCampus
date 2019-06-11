const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

let newNotifications = [];
let grades = [];

const app = express();
const port = 4001;
app.use(cors());

// TODO:

app.get("/", (req, res) => {
  res.status(200).send("GradesCalculator Is Working");
});

app.get("/grades", (req, res) => {});

app.listen(port, () =>
  console.log(`Grades Calculator Service listening on port ${port}!`)
);

let calculateGrades = newScores => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      newScores.forEach(score => {
        grades = grades.map(g => {
          if (g.studentName === score.studentName) {
            g.grade = getRandomGrade();
          }

          return g;
        });
      });
      resolve();
    }, 5000);
  });
};

let getRandomGrade = () => {
  return [
    "A+",
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "D-",
    "F"
  ][Math.floor(Math.random() * 13)];
};
