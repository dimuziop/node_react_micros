const express = require('express');
const bodyParser = require("body-parser")
const { axios } = require('axios');

const app = express();
app.use(bodyParser.json());


app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {

    const { id, content, postId } = data;

    const comment = {
      id,
      content
    }



  }

  res.send({})
})

module.exports = app;
