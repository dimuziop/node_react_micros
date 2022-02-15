const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {

  res.send({ status: 'OK' });

});

app.post('/events', (req, res) => {
  console.log("received event: ", req.body.type)
  res.send({})
})

module.exports = app;
