const express = require('express');
const bodyParser = require("body-parser")
const cors = require("cors");
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const setup = async () => {
  try {
    const res = await axios.get("http://localhost:4005/events");
    console.log("RUNN");

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
};



const posts = {};

const handleEvent = (type, data) => {
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
}

app.get("/posts", (req, res) => {

  res.send(posts);

});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({})
})

module.exports = { app, setup };
