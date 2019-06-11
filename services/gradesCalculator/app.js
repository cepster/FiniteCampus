const express = require("express");
var cors = require("cors");

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

const app = express();
const port = 4001;
app.use(cors());

// TODO: Read from message queue, re-calculate grades

app.get("/grades", (req, res) => {
  res.status(200).send(grades);
});

app.listen(port, () =>
  console.log(`Grades Calculator Service listening on port ${port}!`)
);

var open = require("amqplib").connect("amqp://localhost");

// Consumer
open
  .then(function(conn) {
    return conn.createChannel();
  })
  .then(function(ch) {
    return ch.assertQueue("gradebook").then(function(ok) {
      return ch.consume("gradebook", function(msg) {
        if (msg !== null) {
          console.log(msg.content.toString());
          calculateGrades(JSON.parse(msg.content.toString()));
          ch.ack(msg);
        }
      });
    });
  })
  .catch(console.warn);

let calculateGrades = newScores => {
  console.log("Got message, calculating grades");
  console.log(newScores);
  setTimeout(() => {
    newScores.forEach(score => {
      grades = grades.map(g => {
        if (g.studentName === score.studentName) {
          g.grade = getRandomGrade();
        }

        return g;
      });
    });
  }, 5000);
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
