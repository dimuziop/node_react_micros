
require('dotenv').config();

const { app, setup } = require('./src');

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server is live at localhost:${PORT}`)
  await setup();
});
