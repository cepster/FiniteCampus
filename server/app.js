const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

const app = express();
app.use(cors());

/*
 * GET /grades
 */
app.get("/grades", (req, res) => {
  res.status(200).send(grades);
});

/*
 * GET /newNotifications
 */
app.get("/newNotifications", (req, res) => {
  res.status(200).send(newNotifications);
  newNotifications = [];
});

/*
 * POST /saveGradebook
 * Updates gradebook scores, calls out to grades calculator, and triggers notifications
 */
app.post("/saveGradebook", bodyParser.json(), (req, res) => {
  saveGradebook();
  calculateGrades(req.body).then(() => {
    sendNotifications(req.body);
    res.status(200).send(req.body);
  });
});

app.listen(4000, () => console.log(`Example app listening on port 4000!`));

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

let saveGradebook = () => {
  console.log("Saving Grade Book!");
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

/*
 * Data
 */

let newNotifications = [];
let grades = [
  {
    id: 1,
    studentName: "Bart Simpson",
    grade: "F"
  },
  {
    id: 2,
    studentName: "Milhouse Van Houten",
    grade: "C"
  },
  {
    id: 3,
    studentName: "Lisa Simpson",
    grade: "A+"
  },
  {
    id: 4,
    studentName: "Martin Prince",
    grade: "A"
  }
];
