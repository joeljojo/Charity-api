const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./Routes/routes');
const database = require('./Config/db');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(routes);
const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
