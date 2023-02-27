const express = require('express');

// eslint-disable-next-line no-unused-vars
const database = require('./Config/db');

const app = express();
const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
