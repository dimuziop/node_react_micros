const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors");
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const POSTS_SERVICE_HOSTNAME = process.env.POSTS_SERVICE_HOSTNAME || "localhost";
const POSTS_SERVICE_PORT = process.env.POSTS_SERVICE_PORT || "4005";
const BASE_POSTS_URL = `http://${POSTS_SERVICE_HOSTNAME}:${POSTS_SERVICE_PORT}`;


const events = [];


app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post(`${BASE_POSTS_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });
  // axios.post('http://localhost:4001/events', event).catch((err) => {
  //   console.log(err.message);
  // });
  // axios.post('http://localhost:4002/events', event).catch((err) => {
  //   console.log(err.message);
  // });
  // res.send({ status: 'OK' });

  // axios.post('http://localhost:4003/events', event).catch((err) => {
  //   console.log(err.message);
  // });
  res.send({ status: 'OK' });

});

app.get('/events', (req, res) => {
  res.send(events);
})

module.exports = app;
