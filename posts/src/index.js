const express = require('express');
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const EVENT_BUS_SERVICE_HOSTNAME = process.env.EVENT_BUS_SERVICE_HOSTNAME || "localhost";
const EVENT_BUS_SERVICE_PORT = process.env.EVENT_BUS_SERVICE_PORT || "4005";
const BASE_EVENT_BUS_URL = `http://${EVENT_BUS_SERVICE_HOSTNAME}:${EVENT_BUS_SERVICE_PORT}`;


const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});


app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id, title
  };

  await axios.post(`${BASE_EVENT_BUS_URL}/events`, {
    type: "PostCreated",
    data: {
      id, title
    }
  }).catch((err) => {
    console.log(err.message);
  });

  res.status(201).send(posts[id]);

});

app.post('/events', (req, res) => {
  console.log("received event: ", req.body.type)
  res.send({})
})

module.exports = app;
