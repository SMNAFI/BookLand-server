const express = require('express');
require('dotenv').config()

const port = process.env.PORT || 5000;

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port)