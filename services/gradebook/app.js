const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const port = 4000;
const app = express();
app.use(cors());

app.get("/helloWorld", (req, res) => {
  res.status(200).send("Gradebook is working!");
});

app.post("/saveGradebook", bodyParser.json(), (req, res) => {
  calculateGrades().then(() => {
    sendNotifications(req.body);
    res.status(200).send(req.body);
    // TODO: Write to message queue
  });
});

app.listen(port, () =>
  console.log(`Gradebook Service listening on port ${port}!`)
);
