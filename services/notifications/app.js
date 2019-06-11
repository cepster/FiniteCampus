const express = require("express");
const amqp = require("amqplib");
const cors = require("cors");

let newNotifications = [];

const port = 4002;
const app = express();
app.use(cors());

app.get("/newNotifications", (req, res) => {
  res.status(200).send(newNotifications);
  newNotifications = [];
});

var open = amqp.connect("amqp://localhost");

// Consumer
open
  .then(function(conn) {
    return conn.createChannel();
  })
  .then(function(ch) {
    return ch.assertQueue("notifications").then(function(ok) {
      return ch.consume("notifications", function(msg) {
        if (msg !== null) {
          console.log(msg.content.toString());
          sendNotifications(JSON.parse(msg.content.toString()));
          ch.ack(msg);
        }
      });
    });
  })
  .catch(console.warn);

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
