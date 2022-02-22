const express = require('express');
const bodyParser = require("body-parser")
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const EVENT_BUS_SERVICE_HOSTNAME = process.env.EVENT_BUS_SERVICE_HOSTNAME || "localhost";
const EVENT_BUS_SERVICE_PORT = process.env.EVENT_BUS_SERVICE_PORT || "4005";
const BASE_EVENT_BUS_URL = `http://${EVENT_BUS_SERVICE_HOSTNAME}:${EVENT_BUS_SERVICE_PORT}`;


app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {

    const { id, content, postId } = data;

    const status = content.includes("orange") ? "rejected" : "approved"

    await axios.post(`${BASE_EVENT_BUS_URL}/events`, {
      type: "CommentModerated",
      data: {
        id, content, postId, status
      }
    }).catch((err) => {
      console.log(err.message);
    });



  }

  res.send({})
})

module.exports = app;
