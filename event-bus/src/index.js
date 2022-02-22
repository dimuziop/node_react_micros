const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors");
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const POSTS_SERVICE_HOSTNAME = process.env.POSTS_SERVICE_HOSTNAME || "localhost";
const POSTS_SERVICE_PORT = process.env.POSTS_SERVICE_PORT || "4000";
const BASE_POSTS_URL = `http://${POSTS_SERVICE_HOSTNAME}:${POSTS_SERVICE_PORT}`;

const COMMENTS_SERVICE_HOSTNAME = process.env.COMMENTS_SERVICE_HOSTNAME || "localhost";
const COMMENTS_SERVICE_PORT = process.env.COMMENTS_SERVICE_PORT || "4000";
const BASE_COMMENTS_URL = `http://${COMMENTS_SERVICE_HOSTNAME}:${COMMENTS_SERVICE_PORT}`;

const MODERATION_SERVICE_HOSTNAME = process.env.MODERATION_SERVICE_HOSTNAME || "localhost";
const MODERATION_SERVICE_PORT = process.env.MODERATION_SERVICE_PORT || "4000";
const BASE_MODERATION_URL = `http://${MODERATION_SERVICE_HOSTNAME}:${MODERATION_SERVICE_PORT}`;

const QUERY_SERVICE_HOSTNAME = process.env.QUERY_SERVICE_HOSTNAME || "localhost";
const QUERY_SERVICE_PORT = process.env.QUERY_SERVICE_PORT || "4000";
const BASE_QUERY_URL = `http://${QUERY_SERVICE_HOSTNAME}:${QUERY_SERVICE_PORT}`;


const events = [];


app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post(`${BASE_POSTS_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`${BASE_COMMENTS_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });
  axios.post(`${BASE_QUERY_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });

  axios.post(`${BASE_MODERATION_URL}/events`, event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: 'OK' });

});

app.get('/events', (req, res) => {
  res.send(events);
})

module.exports = app;
