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

let calculateGrades = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });
};
