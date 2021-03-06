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


const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  res.send(commentsByPostId[postId] || []);
});


app.post("/posts/:id/comments", async (req, res) => {
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[postId] || [];

  //commentsByPostId[postId] = [...comments, { id: commentId, content }]

  comments.push({ id: commentId, content, status: "pending" })
  commentsByPostId[postId] = comments;

  await axios.post(`${BASE_EVENT_BUS_URL}/events`, {
    type: "CommentCreated",
    data: {
      id: commentId, content, postId, status: "pending"
    }
  }).catch((err) => {
    console.log(err.message);
  });

  res.status(201).send(comments);

});

app.post('/events', async (req, res) => {

  const { type, data } = req.body;

  if (type === "CommentModerated") {

    const { id, postId, status } = data;

    const comments = commentsByPostId[postId];


    const comment = comments.find(comment => comment.id === id);
    comment.status = status;


    await axios.post(`${BASE_EVENT_BUS_URL}/events`, {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content: comment.content,
        status: comment.status
      }
    }).catch((err) => {
      console.log(err.message);
    });

  }

  console.log("received event: ", type)
  res.send({})
})

module.exports = app;
