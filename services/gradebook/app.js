const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const amqp = require("amqplib");

const port = 4000;
const app = express();
app.use(cors());

app.post("/saveGradebook", bodyParser.json(), (req, res) => {
  let open = amqp.connect("amqp://mattrichardsmpb.infinitecampus.com:5672");

  // Publisher
  open
    .then(function(conn) {
      return conn.createChannel();
    })
    .then(function(ch) {
      return ch.assertQueue("gradebook").then(function(ok) {
        ch.assertQueue("notifications").then(function(ok2) {
          return ch.sendToQueue(
            "notifications",
            Buffer.from(JSON.stringify(req.body))
          );
        });

        return ch.sendToQueue(
          "gradebook",
          Buffer.from(JSON.stringify(req.body))
        );
      });
    })
    .catch(console.warn);

  res.status(200).send(req.body);
});

app.listen(port, () =>
  console.log(`Gradebook Service listening on port ${port}!`)
);
