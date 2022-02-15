const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors");
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.post("/events", (req, res) => {
  const event = req.body;

  axios.post('http://localhost:4000/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: 'OK' });

  axios.post('http://localhost:4003/events', event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: 'OK' });

});

module.exports = app;
