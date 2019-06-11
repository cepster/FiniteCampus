const express = require("express");
var cors = require("cors");

let newNotifications = [];

const port = 4002;
const app = express();
app.use(cors());

app.get("/helloWorld", (req, res) => {
  res.status(200).send("Notifications works!!");
});

app.get("/newNotifications", (req, res) => {
  res.status(200).send(newNotifications);
  newNotifications = [];
});

// TODO: Read from queue and write notifications

app.listen(port, () =>
  console.log(`Notifications Service listening on port ${port}!`)
);

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
