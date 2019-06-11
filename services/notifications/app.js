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

app.listen(port, () => {
  startMessageQueueListener();
  console.log(`Notifications Service listening on port ${port}!`);
});

/*
 * RabbitMQ Consumer
 */
const rabbitEndpoint = "mattrichardsmpb.infinitecampus.com";
const notificationsChannel = "notifications";
const startMessageQueueListener = () => {
  var open = amqp.connect(`amqp://${rabbitEndpoint}`);

  // Consumer
  open
    .then(function(conn) {
      return conn.createChannel();
    })
    .then(function(ch) {
      return ch.assertQueue(notificationsChannel).then(function(ok) {
        return ch.consume(notificationsChannel, function(msg) {
          if (msg !== null) {
            console.log(msg.content.toString());
            sendNotifications(JSON.parse(msg.content.toString()));
            ch.ack(msg);
          }
        });
      });
    })
    .catch(console.warn);
};

/*
 * Generates notifications from the RabbitMQ payload
 */
let sendNotifications = newScores => {
  newScores.forEach(score => {
    newNotifications.push(
      `${score.studentName} has scored a ${score.score} on ${
        score.assignmentName
      }`
    );
  });
};
