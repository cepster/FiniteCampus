const express = require("express");
const cors = require("cors");
const amqp = require("amqplib");

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

const port = 4001;
const app = express();
app.use(cors());

app.get("/grades", (req, res) => {
  res.status(200).send(grades);
});

app.listen(port, () => {
  startMessageQueueListener();
  console.log(`Grades Calculator Service listening on port ${port}!`);
});

/*
 * RabbitMQ Consumer
 */
const rabbitEndpoint = "mattrichardsmpb.infinitecampus.com";
const gradesChannel = "gradebook";
const startMessageQueueListener = () => {
  var open = amqp.connect(
    "amqp://gdrcgqtq:6QzX6eTcdFLhPU86FYqbXi6H3eMl198L@shrimp.rmq.cloudamqp.com/gdrcgqtq"
  );

  // Consumer
  open
    .then(function(conn) {
      return conn.createChannel();
    })
    .then(function(ch) {
      return ch.assertQueue(gradesChannel).then(function(ok) {
        return ch.consume(gradesChannel, function(msg) {
          if (msg !== null) {
            calculateGrades(JSON.parse(msg.content.toString()));
            ch.ack(msg);
          }
        });
      });
    })
    .catch(console.warn);
};

/*
 * Calculates New Grades based on Payload
 */
let calculateGrades = newScores => {
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

/*
 * Returns a random letter grade
 */
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
