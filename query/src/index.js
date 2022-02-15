const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {

  res.send(posts);

});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;

    posts[id] = {
      id, title, comments: []
    };

  }

  if (type === "CommentCreated") {

    const { id, content, postId, status } = data;

    const comment = {
      id,
      content,
      status
    }

    const post = posts[postId];
    post.comments.push(comment)

  }

  if (type === "CommentUpdated") {

    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comments = post.comments;


    const comment = comments.find(comment => comment.id === id);
    comment.status = status;
    comment.content = content

  }

  console.log(posts)

  res.send({})
})

module.exports = app;
