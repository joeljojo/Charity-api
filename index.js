const express = require('express');
const routes = require('./Routes/routes');
const database = require('./Config/db');

const app = express();
app.use(express.json());
app.use(routes);
const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
