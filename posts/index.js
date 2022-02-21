
require('dotenv').config();

const app = require('./src');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Version 21`)
  console.log(`Server is live at localhost:${PORT}`)
});
